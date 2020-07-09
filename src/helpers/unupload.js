const fs = require("fs");
module.exports = deleteUpload = async (img) => {
  fs.stat(__dirname + "../../../public/images/" + img, function (err, stats) {
    console.log(stats);
    if (err) {
      return console.error(err);
    }
    fs.unlink(__dirname + "../../../public/images/" + img, function (err) {
      if (err) return console.log(err);
      console.log("file deleted successfully");
    });
  });
};
