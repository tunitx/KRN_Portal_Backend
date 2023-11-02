const { S3Client } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-provider-env");
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

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
            const extension = file.originalname.split('.').pop();
            const filename = `${uuidv4()}.${extension}`;
            cb(null, filename);
        }
    }),
    
  });
//? exporting the module namely uploadS3 to be used in uploading photos and pdfs respectively

module.exports = uploadS3;