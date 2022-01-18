const app = require('./src/server')


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server running in http://localhost:${PORT}`)
})