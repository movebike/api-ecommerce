const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    }, 
    filename: function (req, file, cb) {
        const time = new Date().toLocaleTimeString()
        const newName =  `${time}-${file.originalname}`
        cb(null, newName.replace(/ /g, ''))
    }
})

const upload = multer({storage})

module.exports = upload 