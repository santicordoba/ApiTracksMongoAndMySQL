require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo.js');
const app = express();
const loggerStream = require("./utils/handleLoger")
const morganBody = require('morgan-body');


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

/*
Aquí invocamos a las rutas

*/

app.use("/api", require("./routes"));

app.listen(port, () => {
    console.log('Tu app esta lista por http://localhost:'+port);
});

dbConnect();