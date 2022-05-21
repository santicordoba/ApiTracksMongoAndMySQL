const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const StorageScheme = new mongoose.Schema(
    {
        url: {
            type:String,
        },
        filename: {
            type:String,
        },
    },
    {
        timestamps:true, //todo createdAt, updateAt
        versionKey:false,
    }   
);

//SE EXPORTA EL NOMBRE DE LA "TABLA" Y EL ESQUEMA
StorageScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("storage", StorageScheme);
