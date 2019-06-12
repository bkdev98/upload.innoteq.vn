import validate from 'express-validation';
import { Router } from 'express';

import Controllers from './user.controllers';
import Validations from './user.validations';
import { authLocal, authJwt } from '../../utils/passport';
import { isAdmin, isOwnOrAdmin } from '../../utils/role';

const routes = new Router();

routes.get('/', authJwt, isAdmin, Controllers.getUserList);
routes.get('/:id', authJwt, isAdmin, Controllers.getUser);
routes.post('/login', validate(Validations.login), authLocal);
routes.post('/add', authJwt, isAdmin, validate(Validations.createUser), Controllers.createUser);
routes.post('/register', validate(Validations.register), Controllers.createUser);
routes.patch('/:id', authJwt, isOwnOrAdmin, validate(Validations.editProfile), Controllers.updateUser);
routes.delete('/:id', authJwt, isAdmin, Controllers.deleteUser);

export default routes;
