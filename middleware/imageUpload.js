const multer = require("multer");
const path = require("path");

const uploadPath = path.join(__dirname, "../upload/images");
const upload = multer({
  limits: { fileSize: 10000000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      let cleanName = file.originalname
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9._-]/g, ""); 

  cb(null, `${Date.now()}_${cleanName}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(
        new Error("Only images with jpeg,jpg,png,webp extensions are allowed")
      );
    }
  },
});

module.exports = upload;
