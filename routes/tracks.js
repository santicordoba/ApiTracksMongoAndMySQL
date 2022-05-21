const express = require('express');
const router = express.Router();

const {validatorCreateItem, validatorGetItem} = require("../validators/tracks")
const authMiddleware = require("../middleware/session");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const checkRole = require('../middleware/role');


//GENERAREMOS la ruta localhost/tracks 

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post("/", authMiddleware, checkRole(["admin"]), validatorCreateItem, createItem);
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;