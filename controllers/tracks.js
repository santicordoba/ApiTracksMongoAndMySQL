const { matchedData } = require("express-validator");
const {tracksModel} = require("../models");
const {handleHttpError} = require("../utils/handleError");

const getItems = async (req, res) => {
    try {
      const user = req.user;
      const data = await tracksModel.findAllData({});
      res.send({ data,  user });
    } catch (e) {
      console.log(e)
      handleHttpError(res, "ERROR_GET_ITEMS");
    }
  };
  
  /**
   * Obtener un detalle
   * @param {*} req
   * @param {*} res
   */
  const getItem = async (req, res) => {
    try{
      req = matchedData(req);
      const {id} = req;
      const data = await tracksModel.findOneData(id);
      res.send({ data });
    }catch(e){
      console.log(e);
      handleHttpError(res,"ERROR_GET_ITEM")
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