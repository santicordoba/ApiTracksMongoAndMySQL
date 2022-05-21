const bcryptjs = require('bcryptjs');

// passwordPlain contraseña sin encriptar
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash;
};

// recibe contraseña sin encriptar y contraseña encriptada
const compare = (passwordPlain, hashPassword) => {
    return bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = {encrypt, compare}