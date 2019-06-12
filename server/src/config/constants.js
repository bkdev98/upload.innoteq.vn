const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/upload-innoteq-dev',
  JWT_SECRET: '890qwuioefsadjkh12',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost:27017/upload-innoteq-test',
  JWT_SECRET: '890qwuioefsadjkh12',
};

const prodConfig = {
  MONGO_URL: process.env.MONGODB_URI,
  JWT_SECRET: '890qwuioefsadjkh12',
};

const defaultConfig = {
  PORT: process.env.PORT || 9843,
  MAIL_TOKEN_LIFESPAN: 1,
  AUTH_TOKEN_LIFESPAN: 60,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};