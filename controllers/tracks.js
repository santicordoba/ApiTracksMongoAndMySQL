const { matchedData } = require("express-validator");
const {tracksModel} = require("../models");
const {handleHttpError} = require("../utils/handleError");

//OBTENER LISTA DE ELEMENTOS
const getItems = async (req, res) => {
    // esto devuelve una promesa por eso con await 
    //esperamos que se ejecuta el find y se debe agregar async a la funcion
    try{
        const user = req.user;
        const data = await tracksModel.find({});
        res.send({ data, user });
    } catch(e){
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
};

// //OBTENER UN ELEMENTO
const getItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findById(id);
        res.send({ data });
    }catch(e){
        handleHttpError(res, "ERROR_GET_ITEM");
    }
};

// //CREAR ELEMENTO
const createItem = async (req, res) => {
  try {
    req = matchedData(req);
    console.log(req);
    const data = await tracksModel.create(req);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

// //ACTUALIZAR ELEMENTO
const updateItem = async (req, res) => {
    try{
        //del req creo dos objetos uno que contenga el id y el otro con los demas valores del req
        const { id, ...body} = matchedData(req);
        const data = await tracksModel.findByIdAndUpdate(
            req.params.id, body, {new: true}
        );
        res.send({data});
    } catch(e){
        handleHttpError(res, "ERROR_UPDATE_ITEMS")
    }
};

// //ELIMINAR ELEMENTO
const deleteItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.delete({_id:id});
        res.send({ data });
    }catch(e){
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };