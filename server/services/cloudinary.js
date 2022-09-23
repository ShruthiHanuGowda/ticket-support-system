const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "digiclave",
  api_key: "181911267388242",
  api_secret: "NMd4jqYArIpneFMo7jIaJMiQ-WU",
});
const uploadFiles = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { upload_preset: "ml_default" },
      (error, result) => {
        if (error) {
          reject(new Error("Serror error."));
        } else {
          resolve(result);
        }
      }
    );
  });
};
const deleteFile = async (filename) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(filename, (error, result) => {
      if (error) {
        reject(new Error("Serror error."));
      } else {
        resolve(true);
      }
    });
  });
};
const getImgUrl = async (filename) => {
  return cloudinary.url(filename);
};
module.exports = { uploadFiles, deleteFile, getImgUrl };
