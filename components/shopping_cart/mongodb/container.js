import model from './model.js';

class ShoppingMongoContainer{
    constructor() {}

    async create(data){
        try {
            const newShoppingCart = await model.create({
                productos:data.productos
            });
            return newShoppingCart;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async insertProductsInShoppingCartById(id,data){
        try {
            let insertProducts = await model.findByIdAndUpdate(id,{
                $push:{
                    productos:data.productos
                }
            });
            return insertProducts;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAll(){
        try {
            const listShoppingCart = await model
            .find()
            .populate({path:'productos',select:'timestamp nombre descripcion codigo foto precio stock'});
            return listShoppingCart;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getShoppingCartById(id){
        try {
            const shoppinCart = await model
            .findById(id)
            .populate({path:'productos',select:'timestamp nombre descripcion codigo foto precio stock'});
            return shoppinCart;
        } catch (error) {
            console.log(error);
            return [];
        }
    }


    async deleteShoppingCartById(id){
        try {
            const deleteShopping = await model.findByIdAndDelete(id);
            console.log(deleteShopping);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteProductInShoppingCartById(id,productId){
        try {
            let insertProducts = await model.findByIdAndUpdate(id,{
                $pull:{
                    productos:productId
                }
            });
            return insertProducts;
        } catch (error) {
            console.log(error);
            return false;
        }
    }   
}   

export default ShoppingMongoContainer;