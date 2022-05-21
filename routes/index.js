const fs = require('fs')
const router = require('express').Router();

const PATH_ROUTES = `${__dirname}`;

const removeExtension = (filename) => {
    // convierto string a array cuando encuentro un punto y con shift me quedo con el primer elemento
    return filename.split('.').shift();
}


fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);
    if(name !== "index"){
        router.use(`/${name}`,require(`./${file}`));
    }
})

module.exports = router;