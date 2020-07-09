const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, __dirname + "../../../public/images");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}` + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    fileTypeCheck(file, cb);
  },
}).single("image");

const fileTypeCheck = (file, cb) => {
  console.log(file);
  const types = /jpeg|jpg|png|svg/;
  const extname = types.test(path.extname(file.originalname).toLowerCase());
  const mimetype = types.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: file must be image");
  }
};

module.exports = upload;
