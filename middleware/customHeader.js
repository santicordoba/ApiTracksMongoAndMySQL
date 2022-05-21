const customHeader = (req, res, next) => {
    try{
        const apiKey = req.headers.api_key;
        //SI VIENE LO QUE ESPERO LO DEJO PASAR SI NO LE DEVUELVO UN ERROR -> EL NEXT LO DEJA PASAR AL SIGUIENTE MIDDLEWARE O AL FINAL DEL POST ES DECIR A LA FUNCIOON CON LA DB
        if(apiKey === "santicordoba-01"){
            next();
        } else {
            res.status(403);
            res.send({error:"API_KEY_NO_ES_CORRECTO"});
        }
    } catch(e){
        res.send({error:"ALGO_OCURRIO_EN_EL_CUSTOM_HEADER"})
    }
}

module.exports = customHeader;