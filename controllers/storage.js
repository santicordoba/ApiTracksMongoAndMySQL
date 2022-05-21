const { matchedData } = require("express-validator");
const {storageModel} = require("../models");
const {handleHttpError} = require("../utils/handleError");
const fs = require('fs');
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

//OBTENER LISTA DE ELEMENTOS
const getItems = async (req, res) => {
    // esto devuelve una promesa por eso con await 
    //esperamos que se ejecuta el find y se debe agregar async a la funcion
    try{
        const data = await storageModel.find({});
        res.send({ data });
    }catch(e){
        handleHttpError(res, "ERROR_GET_ALL_ITEMS")
    }
};

// //OBTENER UN ELEMENTO
const getItem = async (req, res) => {
    try{
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({ data });
    }catch(e){
        handleHttpError(res, "ERROR_GET_ITEM")
    }
};

// //CREAR ELEMENTO
const createItem = async (req, res) => {
    try{
        const { body, file } = req;
        console.log(file)
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData);
        res.send({data});
    }catch(e){
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
};


// //ELIMINAR ELEMENTO
const deleteItem = async (req, res) => {
    try{
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({_id:id});
        // eliminar del disco se declaran variables arribas para usar fs y media path
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;
        fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted:1
        };
        res.send({ data });
    }catch(e){
        handleHttpError(res, "ERROR_GET_ITEM")
    }
};

module.exports = { getItems, getItem, createItem, deleteItem };