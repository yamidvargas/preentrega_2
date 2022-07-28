export const verifyRol = (request,response,next) => {
    let isAdmin = request.get('admin');
    let pathUrl = request.originalUrl;
    let method = request.method;
    if(isAdmin){
        next();
    }
    else{
        return response.status(401).json({
            error:-1,
            descripcion: `Ruta ${pathUrl} metodo ${method} no autorizada`
        })
    }
    
}