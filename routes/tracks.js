const express = require('express');
const router = express.Router();

const {validatorCreateItem, validatorGetItem} = require("../validators/tracks")
const authMiddleware = require("../middleware/session");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const checkRole = require('../middleware/role');


//GENERAREMOS la ruta localhost/tracks 
/**
 * Get all tracks
 * @swagger
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "List all tracks"
 *      description: List all tracks with details
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: .
 *        '402':
 *          description: Not allow because you need more permissions
 *    responses:
 *      '201':
 *        description: retorna el objeto insertado en la coleccion con stado '201'
 */
router.get("/", authMiddleware, getItems);
/**
 * Get track
 * @swagger
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Get track"
 *      description: Get track detail
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "path"
 *           name: "id"
 *           description: "ID track"
 *           required: true
 *           schema:
 *              type: string
 *    responses:
 *      '201':
 *        description: retorna el objeto insertado en la coleccion con stado '201'
 * 
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem);
/**
 * Post new track
 * @swagger
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: "Add track"
 *      description: Add new track with detail
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "parametros requeridos para insertar comentrario"
 *           required: true
 *           schema:
 *              $ref: "#/definitions/track"
 *    responses:
 *      '201':
 *        description: retorna el objeto insertado en la coleccion con stado '201'
 */
router.post("/", authMiddleware, checkRole(["admin", "user"]), validatorCreateItem, createItem);
/**
 * Upadte new track
 * @swagger
 * /tracks/{id}:
 *    put:
 *      tags:
 *        - tracks
 *      summary: "Update track"
 *      description: Update track with detail
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "parametros requeridos para insertar comentrario"
 *           required: true
 *           schema:
 *              $ref: "#/definitions/track"
 *        -  in: "path"
 *           name: "id"
 *           description: "ID track"
 *           required: true
 *           schema:
 *              type: string
 *    responses:
 *      '201':
 *        description: retorna el objeto insertado en la coleccion con stado '201'
 */
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
/**
 * Delete track
 * @swagger
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: "Delete track"
 *      description: Delete track detail
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "path"
 *           name: "id"
 *           description: "ID track"
 *           required: true
 *           schema:
 *              type: string
 *    responses:
 *      '201':
 *        description: retorna el objeto insertado en la coleccion con stado '201'
 * 
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;