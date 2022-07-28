import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    timestamp:{
        type:Date,
        default:Date.now()
    },
    nombre:{
        type:String,
        default:'Sin Nombre'
    },
    descripcion:{
        type:String,
        default:'Sin Descripcion'
    },
    codigo:{
        type:String,
        default:'Sin Codigo'
    },
    foto:{
        type:String,
        default:'Sin foto'
    },
    precio:{
        type:Number,
        default:1
    },
    stock:{
        type:Number,
        default:1
    }
});


export default mongoose.model('Product',productSchema);