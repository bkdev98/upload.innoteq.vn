# upload.innoteq.vn

> Simple image upload server using CRA, Express, Sharp and S3, deployed on Heroku.

> It can also used as a template for react-express type apps, with authentication and ant-design configured.

### File structure

- /client: React project using [create-react-app](https://github.com/facebook/create-react-app).
- /server: Our [express](https://expressjs.com/) app, compiled by [babel](https://babeljs.io/).

### Development

- Get [AWS S3](https://s3.console.aws.amazon.com/s3/home) and [MongoDB](https://www.mongodb.com/) configs, then update .env file:

```
  cp server/.env.example server/.env
  vim server/.env
```

- Install deps and start server:

```
  yarn install
  yarn dev
```

### Production

```
  yarn build
  yarn start
```

### Contribute

See [https://github.com/bkdev98/upload.innoteq.vn/issues](https://github.com/bkdev98/upload.innoteq.vn/issues).

### License

MIT I guess.
