import mongoose, { Schema } from 'mongoose';

const UploadSchema = new Schema({
  originalName: String,
  originalUrl: String,
  originalSize: Number,
  averageUrl: String,
  averageSize: Number,
  thumbnailUrl: String,
  thumbnailSize: Number,
  encoding: String,
  mimetype: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

UploadSchema.index({ originalName: 'text' });

export default mongoose.model('Upload', UploadSchema);
