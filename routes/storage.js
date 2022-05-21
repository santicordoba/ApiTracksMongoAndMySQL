const express = require('express');
const router = express.Router();
const multer = require('multer');
const {createItem, getItems, getItem, deleteItem} = require("../controllers/storage");
const {validatorGetItem} = require("../validators/storage");


const uploadMiddleware = require("../utils/handleStorage");

router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem)
router.delete("/:id", validatorGetItem, deleteItem)
//enviar archivo single() o multi() dependiendo cuantos archivos
router.post("/", uploadMiddleware.single("myfile"), createItem);


module.exports = router;