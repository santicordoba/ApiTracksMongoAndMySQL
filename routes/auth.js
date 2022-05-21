const express = require('express');
const router = express.Router();
const {validatorRegister, validatorLogin} = require('../validators/auth');
const {loginCtrl, registeCtrl} = require('../controllers/auth');

//GENERAREMOS la ruta localhost/auth/login
//                     localhost/auth/register

router.post("/login", validatorLogin, loginCtrl);
router.post("/register", validatorRegister, registeCtrl);

module.exports = router;