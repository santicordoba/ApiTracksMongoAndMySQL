const { handleHttpError } = require("../utils/handleError");

//recibe un array con los roles permitidos 
const checkRole = (roles) => (req, res, next) => {
    try{
        const {user} = req;
        console.log({user});
        const rolesByUser = user.role;

        // devuelve true si el rol recibido coincidio como permitido coincide con el rol del usuario
        const checkValueRole = roles.some((rolSingle) => rolesByUser.includes(rolSingle));

        if(!checkValueRole){
            handleHttpError(res, "ERROR_PERMISSION_ROLE", 403);
            return
        }

        next();
    }catch(e){
        handleHttpError(res, "ERROR_PERMISSION_ROLE", 403)
    }
}

module.exports = checkRole;