const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

// ? Set the region and credentials

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// ? configure multer-s3

//? photo uploader config

const uploadS3 = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: 'public-read',
      key: function (req, file, cb) {
          const extension = file.originalname.split('.').pop();
          const filename = `${uuidv4()}.${extension}`;
          cb(null, filename);
      }
  }),
  limits: {
      fileSize: 1024 * 1024 * 5 // ? 5MB
  },
  fileFilter: function (req, file, cb) {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
      } else {
          cb(new Error('Invalid file type. Only JPEG and PNG image files are allowed.'));
      }
  }
});

//?  pdp uploader  config

const uploadPdfS3 = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: 'public-read',
      key: function (req, file, cb) {
          const extension = file.originalname.split('.').pop();
          const filename = `${uuidv4()}.${extension}`;
          cb(null, filename);
      }
  }),
  limits: {
      fileSize: 1024 * 1024 * 10 // ? 10MB
  },
  fileFilter: function (req, file, cb) {
      if (file.mimetype === 'application/pdf') {
          cb(null, true);
      } else {
          cb(new Error('Invalid file type. Only PDF files are allowed.'));
      }
  }
});


//? exporting the modules namely uploadS3 and uploadPdfS3 to be used in uploading photos and pdfs respectively

module.exports = {uploadS3, uploadPdfS3};