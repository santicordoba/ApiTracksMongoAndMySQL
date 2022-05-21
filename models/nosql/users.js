const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const UserScheme = new mongoose.Schema(
    {
        name: {
            type:String
        },
        age: {
            type:Number
        },
        email: {
            type:String,
            unique:true
        },
        password: {
            type:String,
            select:false
        },
        role: {
            type:["user","admin"],
            default: "user"
        }
    },
    {
        timestamps:true, //todo createdAt, updateAt
        versionKey:false
    }   
);

//SE EXPORTA EL NOMBRE DE LA "TABLA" Y EL ESQUEMA
UserScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("users", UserScheme);
