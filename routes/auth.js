const express = require('express');
const router = express.Router();
const {validatorRegister, validatorLogin} = require('../validators/auth');
const {loginCtrl, registeCtrl} = require('../controllers/auth');

//GENERAREMOS la ruta localhost/auth/login
//                     localhost/auth/register

/**
 * http://localhost:3001/api
 * 
 * Route login user
 * @openapi
 * /auth/login:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Se logea un usuario"
 *          description: "Esta ruta es para logear un usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authLogin"
 *          responses:
 *                  '201':
 *                      description: El usuario se logea de manera correcta
 *                  '403':
 *                      description: Error por validacion
 */

router.post("/login", validatorLogin, loginCtrl);
/**
 * http://localhost:3002/api
 * 
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Register nuevo usario"
 *          description: "Esta ruta es para registrar un nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: El usuario se registra de manera correcta
 *                  '403':
 *                      description: Error por validacion
 */
router.post("/register", validatorRegister, registeCtrl);

module.exports = router;