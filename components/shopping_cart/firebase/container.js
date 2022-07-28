import model from './model.js';
import {generateId} from '../../../utils/utils.js';
import FirebaseContainer from '../../product/firebase/container.js';

class ShoppingFirebaseContainer{
    constructor() {}

    async getAll(){
        try {
            const querySnapshot = await model.get();
            let docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id:doc.id,
                timestamp:doc.data().timestamp,
                productos:doc.data().productos
            }));
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getShoppingCartById(id){
        try {
            let doc = model.doc(`${id}`);
            const shoppingCart = await doc.get();
            const response = shoppingCart.data();
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async create(data){
        try {
            let firebaseProduct = new FirebaseContainer();
            let products = [];
            for (const producto of data.productos) {
                let p = await firebaseProduct.getById(producto);
                p.id = producto;
                products.push(p);
            }

            let id = generateId();
            let doc = model.doc(`${id}`);
            const response = await doc.create({
                timestamp:Date.now(),
                productos:products
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async insertProductsInShoppingCartById(id,data){
        console.log(data);

        try {
            let firebaseProduct = new FirebaseContainer();
            let products = [];
            let shoppingData = await this.getShoppingCartById(id);

            shoppingData.productos.map((p) => {
                
                products.push(p);
            });

            for (const producto of data.productos) {
                let p = await firebaseProduct.getById(producto);
                if(p){
                    let isNew = true;
                    for (const prod of products) {
                        if(prod.id == p.id){
                            isNew= false;
                        }
                    }
                    if(isNew){
                        p.id = producto;
                        products.push(p);
                    }
                }
            }

            const doc = model.doc(`${id}`);
            const response = await doc.update({
                productos:products
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateProductInShoppingCartById(id,productId,data){
        try {
            let products = [];
            let shoppingData = await this.getShoppingCartById(id);
            shoppingData.productos.map((p) => {
                products.push(p);
            });

            products.map((p) => {
                if(p.id == productId){
                    p.nombre = (data.nombre) ? data.nombre : p.nombre;
                    p.descripcion = (data.descripcion) ? data.descripcion : p.descripcion;
                    p.codigo = (data.codigo) ? data.codigo : p.codigo;
                    p.foto = (data.foto) ? data.foto : p.foto;
                    p.precio = (data.precio) ? Number(data.precio) : Number(p.precio);
                    p.stock = (data.stock) ? Number(data.stock) : Number(p.stock);
                }
            })

            const doc = model.doc(`${id}`);
            const response = await doc.update({
                productos:newProducts
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteShoppingCartById(id){
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

    async deleteProductInShoppingCartById(id,productId){
        try {
            let shoppingData = await this.getShoppingCartById(id);
            let products = [];
            shoppingData.productos.map((p) => {
                products.push(p);
            });

            let newProducts = products.filter(p => p.id != productId);

            const doc = model.doc(`${id}`);
            const response = await doc.update({
                productos:newProducts
            });

            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }   
}   

export default ShoppingFirebaseContainer;