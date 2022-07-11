const util = require('util');
const multer = require('multer');
const maxSize = 2 * 1024 * 1024;



let storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    
    const folder = req.params.folder;
    console.log('middleware - upload --- destination- folder ' + folder);
    cb(null, __basedir + "/resources/static/assets/uploads/" + folder);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;