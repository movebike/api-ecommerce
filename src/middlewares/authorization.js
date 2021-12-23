
function isAuthorization(req, res, next) {
    try {
        const isAdmin = new Boolean(req.headers.authorization)
        if(!isAdmin) res.status(401).json({
            error : -1,
            description: `ruta ${req.originalUrl} con el método ${req.method} no autorizada`
        }) 
        next()
    } catch (error) {
        res.status(401).json({
            error : -1,
            description: `ruta ${req.originalUrl} con el método ${req.method} no autorizada`
        })
    }
}

module.exports = isAuthorization