import multer from 'multer';
import path from 'path';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3-transform';
import slug from 'slug';
import sharp from 'sharp';
import constants from '../config/constants';

AWS.config.update({
  accessKeyId: constants.AWS_ACCESS_KEY_ID,
  secretAccessKey: constants.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const s3Upload = multer({
  storage: multerS3({
    s3,
    bucket: constants.S3_BUCKET,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    shouldTransform(req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [{
      id: 'original',
      key(req, file, cb) {
        cb(null, `${Date.now().toString()}-${slug(path.parse(file.originalname).name)}-original.png`);
      },
      transform(req, file, cb) {
        cb(null, sharp().png());
      },
    }, {
      id: 'average',
      key(req, file, cb) {
        cb(null, `${Date.now().toString()}-${slug(path.parse(file.originalname).name)}-average.png`);
      },
      transform(req, file, cb) {
        cb(null, sharp().resize({ width: 1000 }).png());
      },
    }, {
      id: 'thumbnail',
      key(req, file, cb) {
        cb(null, `${Date.now().toString()}-${slug(path.parse(file.originalname).name)}-thumbnail.png`);
      },
      transform(req, file, cb) {
        cb(null, sharp().resize({ width: 500 }).png());
      },
    }],
  }),
});

export default s3Upload;