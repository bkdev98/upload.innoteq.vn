import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt-nodejs';
import constants from '../../config/constants';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: [true, 'Email must be unique'],
    minlength: [3, 'Email must equal or longer than 3'],
    maxlength: [120, 'Email must equal or shorter than 120'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must equal or longer than 6'],
    maxlength: [120, 'Password must equal or shorter than 120'],
  },
  fullname: {
    type: String,
    required: true,
    minlength: [3, 'Fullname must equal or longer than 3'],
    maxlength: [80, 'Fullname must equal or shorter than 80'],
  },
  role: {
    type: String, // user | admin
    required: true,
    default: 'user',
    validate: {
      validator(v) {
        return v === 'user' || v === 'admin';
      },
      message: props => `${props.value} is not a valid role`,
    },
  },
  avatar: {
    trim: true,
    type: String,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  hashPassword(password) {
    return hashSync(password);
  },
  validatePassword(password) {
    return compareSync(password, this.password);
  },
  generateJWT(lifespan) {
//     const today = new Date();
//     const expirationDate = new Date(today);
//     expirationDate.setDate(today.getDate() + lifespan);

    return jwt.sign(
      {
        _id: this._id,
//         exp: parseInt(expirationDate.getTime() / 1000, 10),
      },
      constants.JWT_SECRET,
    );
  },
  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
      role: this.role,
      avatar: this.avatar,
    };
  },
  toAuthJSON() {
    return {
      ...this.toJSON(),
      token: this.generateJWT(
//         constants.AUTH_TOKEN_LIFESPAN
      ),
    };
  },
};

UserSchema.index({ fullname: 'text' });

export default mongoose.model('User', UserSchema);
