import model from './model.js';
import {generateId} from '../../../utils/utils.js';
class FirebaseContainer{
    async create(data){
        try {
            let id = generateId();
            let doc = model.doc(`${id}`);
            const response = await doc.create({
                timestamp :Date.now(),
                nombre:data.nombre,
                descripcion:data.descripcion,
                codigo:data.codigo,
                foto:data.foto,
                precio:data.precio,
                stock:data.stock
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAll(){
        try {
            const querySnapshot = await model.get();
            let docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id:doc.id,
                timestamp :doc.data().timestamp,
                nombre:doc.data().nombre,
                descripcion:doc.data().descripcion,
                codigo:doc.data().codigo,
                foto:doc.data().foto,
                precio:doc.data().precio,
                stock:doc.data().stock
            }));
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getById(id = ''){
        try {
            
            let doc = model.doc(`${id}`);
            const product = await doc.get();
            const response = product.data();
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateById(id,data,product){
        try {
            product.nombre = (data.nombre) ? data.nombre : product.nombre;
            product.descripcion = (data.descripcion) ? data.descripcion : product.descripcion;
            product.codigo = (data.codigo) ? data.codigo : product.codigo;
            product.foto = (data.foto) ? data.foto : product.foto;
            product.precio = (data.precio) ? Number(data.precio) : Number(product.precio);
            product.stock = (data.stock) ? Number(data.stock) : Number(product.stock);

            const doc = model.doc(`${id}`);
            const response = await doc.update({
                nombre:product.nombre,
                descripcion:product.descripcion,
                codigo:product.codigo,
                foto:product.foto,
                precio:product.precio,
                stock:product.stock
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteById(id){
        try {
            const doc = model.doc(`${id}`);
            const item = await doc.delete();
            console.log(item);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default FirebaseContainer;