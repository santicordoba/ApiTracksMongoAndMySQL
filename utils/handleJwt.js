const jswonwebtoken = require('jsonwebtoken');
const JWT_SECRET= process.env.JWT_SECRET;
// PORQUE TENGO DOS MOTORES DE DB ESTO ES PARA REEMPLAZAR _ID Por el equivalente dependiendo el motor de base de datos
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()

//recibe el objeto del usuario
const tokenSign = async (user) => {
    const sign = jswonwebtoken.sign(
        {
            // ASI ES CON UN SOLO MOTOR DE DB NOSQL
            // _id: user._id,
            // COMO TENGO DOS MOTORES DE DB debo Generalizar
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
        }
    )
    return sign;
};

const verifyToken = async (tokenJwt) => {
    try{
        return jswonwebtoken.verify(tokenJwt, JWT_SECRET);
    }catch(e){
        return null;
    }
};

module.exports = {tokenSign, verifyToken}