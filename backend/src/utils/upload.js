import path from 'path'

const multer = require('multer')

export const uploadFile = (folderDestination, file) => {
  const date = new Date()
  const dateUpload = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  const dest = `uploads/${folderDestination}/${dateUpload}`
  function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb('Please upload an image!')
    }
  }

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dest)
    },
    filename: function (req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
  })

  var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })
  return upload.single(file)
}
