const express = require('express');
const router = express.Router();
const multer = require('multer');
const {createItem, getItems, getItem, deleteItem} = require("../controllers/storage");
const {validatorGetItem} = require("../validators/storage");
const authMiddleware = require("../middleware/session");


const uploadMiddleware = require("../utils/handleStorage");

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem)
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)
//enviar archivo single() o multi() dependiendo cuantos archivos
router.post("/", authMiddleware, uploadMiddleware.single("myfile"), createItem);


module.exports = router;