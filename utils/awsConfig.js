const { S3Client } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-provider-env");
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const stream = require('stream');

//? configuring the aws s3 bucket

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv()
});

  const uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: 'public-read',
      key: function (req, file, cb) {
        const extension = file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? 'webp' : file.originalname.split('.').pop();
        const filename = `${uuidv4()}.${extension}`;
        cb(null, filename);
      },
      shouldTransform: function (req, file, cb) {
        cb(null, /^image/i.test(file.mimetype));
      },
      transforms: [{
        id: 'original',
        key: function (req, file, cb) {
          const extension = file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? 'webp' : file.originalname.split('.').pop();
          const filename = `${uuidv4()}.${extension}`;
          cb(null, filename);
        },
        transform: function (req, file, cb) {
          let transform = sharp();
          if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            transform = transform.webp();
          }
  
          cb(null, transform);
        },
      }],
    }),
  });
//? exporting the module namely uploadS3 to be used in uploading photos and pdfs respectively

module.exports = uploadS3;
