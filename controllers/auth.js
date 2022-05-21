const {matchedData} = require('express-validator');
const {encrypt, compare} = require('../utils/handlePassword')
const {tokenSign} = require('../utils/handleJwt');
const {usersModel} = require('../models');
const { handleHttpError } = require('../utils/handleError');

const registeCtrl = async (req, res) => {
    try{
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password};
        const dataUser = await usersModel.create(body);
            //quitar el password del retorno
        dataUser.set("password", undefined, {strict:false})
        const data = {
            token: await tokenSign(dataUser),
            user:dataUser,
        }
        res.send({data});
    }catch(e){
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

const loginCtrl = async (req, res) => {
    try{
        req= matchedData(req);
        const user = await usersModel.findOne({email:req.email})
        .select('password name role email');
        if(!user){
            handleHttpError(res, "ERROR_USER_NOT_EXIST", 404);
            return
        }
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword);
        if(!check){
            handleHttpError(res, "ERROR_PASSWORD_INVALID", 401);
            return
        }
        user.set('password', undefined,{strict:false})
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send(data);
    }catch(e){
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = {loginCtrl, registeCtrl};