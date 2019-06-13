import path from 'path';
import HTTPStatus from 'http-status';

import Upload from './upload.model';

async function getListFile(req, res) {
  try {
    const limit = parseInt(req.query.limit, 0) || 50;
    const skip = parseInt(req.query.skip, 0) || 0;
    const search = req.query.search;
    const queries = { user: req.user._id, isRemoved: false };
    if (search && search.length) {
      queries.$text = { $search: search };
    }
    const uploads = await Upload.find(queries, { score: { $meta: 'textScore' } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Upload.count(queries);
    return res.status(HTTPStatus.OK).json({ uploads, total });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

async function upload(req, res) {
  try {
    if (!req.file) {
      return res.sendStatus(HTTPStatus.BAD_REQUEST);
    }

    const { originalname, mimetype, encoding, transforms } = req.file;

    if (!mimetype.includes('image')) {
      throw new Error('Only allow image!')
    }

    const originalFile = transforms.find(file => file.id === 'original');
    const averageFile = transforms.find(file => file.id === 'average');
    const thumbnailFile = transforms.find(file => file.id === 'thumbnail');

    const uploaded = await Upload.create({
      originalName: originalname,
      encoding,
      mimetype,
      originalUrl: originalFile && originalFile.location,
      originalSize: originalFile && originalFile.size,
      averageUrl: averageFile && averageFile.location,
      averageSize: averageFile && averageFile.size,
      thumbnailUrl: thumbnailFile && thumbnailFile.location,
      thumbnailSize: thumbnailFile && thumbnailFile.size,
      user: req.user._id,
    });

    return res.status(HTTPStatus.OK).json(uploaded);
  } catch (e) {
    console.log(e);
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

async function deleteFile(req, res) {
  try {
    const file = await Upload.findOne({ _id: req.params.id, isRemoved: false }).populate('user');
    if (!file) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }
    file.isRemoved = true;
    return res.status(HTTPStatus.OK).json(await file.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export default {
  getListFile,
  upload,
  deleteFile,
}