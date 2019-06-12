# upload.innoteq.vn

> Simple image upload server using CRA, Express, Sharp and S3, deployed on Heroku.

> It can also be used as a template for react-express type apps, with authentication and ant-design configured.

### File structure

- /client: React project using [create-react-app](https://github.com/facebook/create-react-app).
  - [Ant Design](https://ant.design) and [React Router](https://reacttraining.com/react-router/web) configured.
  - Using [hooks](https://reactjs.org/docs/hooks-intro.html) and [zustand](https://github.com/react-spring/zustand) for state management.
  - Styling using [styled-components](https://styled-components.com).
- /server: Our [express](https://expressjs.com/) app, compiled with [babel](https://babeljs.io/).
  - Using [mongoose](https://mongoosejs.com/) for quick MongoDB access.
  - [sharp](https://github.com/lovell/sharp) for image processing.
  - [passport](http://www.passportjs.org/) for authentication.

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
