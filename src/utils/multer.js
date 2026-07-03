const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/upload");  
  },
  filename: function (req, file, cb) {
   
    const uniquepreffix = Date.now() + '-' + Math.round(Math.random() * 1E9);   
    

    cb(null,uniquepreffix + "-" + file.originalname );
    
  }
});
 
const upload = multer({ storage: storage });

module.exports = upload;
