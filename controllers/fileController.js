const uploadFile = require("../middleware/upload");
const fs = require('fs');
const baseUrl = "http://localhost:3001/files/";


console.log('fileController -------  inizio');


upload = async (req, res) => {
  
  try {
    
    await uploadFile(req, res);

    console.log('fileController -- Upload -- file: ' + JSON.stringify(req.file));
 
    if (req.file == undefined) {
      return res.status(400).send({ messageupload: "Please upload a file!" });
    }

    res.status(200).send({
      messageupload: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        messageupload: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      messageupload: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        messageupload: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });
};

downloadusers = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/users/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });
};


downloadcarousel = (req, res) => {

  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/carousel/";


  console.log('----------- 1  ---------------------------------------     bkend - downloaddirettivo ' + req.params.name);
  console.log('----------- 2 -------------------------------------     bkend - downloaddirettivo ' + directoryPath);




  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });


};

downloadeventos = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/eventos/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });
};



downloadimages = (req, res) => {

  console.log('-----------------------------------------------     downloadimage');
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/images/message/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        messageupload: "Could not download the file. " + err,
      });
    }
  });
};



module.exports = {
  upload,
  getListFiles,
  download,
  downloadusers,
  downloadcarousel,
  downloadeventos,
  downloadimages
};