import { Router } from 'express';
import validate from 'express-validation';
import Controllers from './upload.controllers';
import { authJwt } from '../../utils/passport';
import upload from '../../utils/upload';
import Validations from './upload.validations';

const routes = new Router();

routes.get('/', authJwt, Controllers.getListFile);
routes.post('/', authJwt, upload.single('file'), validate(Validations.upload), Controllers.upload);
routes.delete('/:id', authJwt, Controllers.deleteFile);

export default routes;
