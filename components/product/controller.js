import { productDto,productList } from './dto.js';
import dao from './dao.js';
export const createProductController = async(request,response) => {
    
    const productData = request.body;
    const newProduct = await dao.create(productData);
    if(newProduct){
        response.status(201).json({
            msg:'El producto se creo de manera exitosa',
            data:newProduct
        })
    }
    else{
        response.status(400).json({
            msg:'Ocurrio un error al crear el producto',
        })
    }
}

export const findProductsController = async(request,response) => {
    
    const products = await dao.getAll();
    response.send(productList(products));
}

export const findProductByIdController = async(request,response) => {
    const id = request.params.id;
    const productExist = await dao.getById(id);
    if(productExist){
        response.send(productDto(productExist));
    }
    else{
        response.status(404).json({
            msg:'No se encontro el producto',
        })
    }
}

export const updateProductController = async(request,response) => {
    const id = request.params.id;
    const data = request.body;
    const productExist = await dao.getById(id);
    if(productExist){
        const productUpdate = await dao.updateById(id,data,productExist);
        if(productUpdate){
            response.json({
                msg:`El producto con el id ${id} fue actualizado con exito`
            });
        }
        else{
            response.status(404).json({
                msg:'No se pudo actualizar el producto',
            })
        }
    }
    else{
        response.status(404).json({
            msg:'No se encontro el producto',
        })
    }
}

export const deleteProductByIdController = async(request,response) => {
    const id = request.params.id;
    const deleteProduct = await dao.deleteById(id);
    if(deleteProduct){
        response.json({
            msg:`El producto con el id ${id} fue eliminado con exito`
        })
    }
    else{
        response.status(404).json({
            msg:'No se encontro el producto',
        })
    }
}