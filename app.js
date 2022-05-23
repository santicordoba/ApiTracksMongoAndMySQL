require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo.js');
const { dbConnectMySQL } = require("./config/mysql");
const app = express();
const loggerStream = require("./utils/handleLoger")
const morganBody = require('morgan-body');
const ENGINE_DB = process.env.ENGINE_DB;

// documentacion
const swaggerUI = require('swagger-ui-express');
const openApiConfig = require('./docs/swagger.js');

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app,{
    noColors:true,
    stream: loggerStream,
    skip: function(req, res){
        return res.statusCode < 400;
    }
})

const port = process.env.PORT;
/**
 * Definir ruta de documentación
 */
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiConfig))


/*
Aquí invocamos a las rutas

*/

app.use("/api", require("./routes"));

app.listen(port, () => {
    console.log('Tu app esta lista por http://localhost:'+port);
});

if(ENGINE_DB == 'nosql'){
    dbConnect();
} else if(ENGINE_DB =='mysql'){
    dbConnectMySQL();
}
