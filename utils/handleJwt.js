const jswonwebtoken = require('jsonwebtoken');
const JWT_SECRET= process.env.JWT_SECRET;

//recibe el objeto del usuario
const tokenSign = async (user) => {
    const sign = jswonwebtoken.sign(
        {
            _id: user._id,
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