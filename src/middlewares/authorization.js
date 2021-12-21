
function isAuthorizatition(req, res, next) {
    try {
        const { isAdmin } = req.headers
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

module.exports = isAuthorizatition