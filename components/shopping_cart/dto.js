import {productList} from '../product/dto.js';
import {dateFormat} from '../../utils/utils.js';
export const shoppingCartDto = (data) => ({
    id: data.id,
    timestamp: dateFormat(data.timestamp),
    productos:productList(data.productos)
});

export const shoppingCartList = (resources) =>resources.map((resource)=>shoppingCartDto(resource));