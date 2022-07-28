import model from './model.js';

class MongoContainer{
    async create(data){
        try {
            const response = await model.create({
                nombre:data.nombre,
                descripcion:data.descripcion,
                codigo:data.codigo,
                foto:data.foto,
                precio:data.precio,
                stock:data.stock
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAll(){
        try {
            const response = await model.find();
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getById(id = ''){
        try {
            const response = await model.findById(id);
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

            const response = await model.findByIdAndUpdate(id,{
                $set:{
                    nombre:product.nombre,
                    descripcion:product.descripcion,
                    codigo:product.codigo,
                    foto:product.foto,
                    precio:product.precio,
                    stock:product.stock
                }
            })
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteById(id){
        try {
            const response = await model.findByIdAndDelete(id);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default MongoContainer;