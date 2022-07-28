import {dateFormat} from '../../utils/utils.js';
export const productDto = (data) => ({
    id: data.id,
    timestamp: dateFormat(data.timestamp),
    nombre: data.nombre,
    descripcion: data.descripcion,
    codigo: data.codigo,
    foto: data.foto,
    precio: data.precio,
    stock: data.precio
});

export const productList = (resources) =>resources.map((resource)=>productDto(resource));