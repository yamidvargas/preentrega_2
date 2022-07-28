export const routeNotFound = (request,response) => {
    let pathUrl = request.originalUrl;
    let method = request.method;
    response.status(404).json({
        error: -2, 
        descripcion: `ruta ${pathUrl} metodo ${method} no implementada`
    })
}