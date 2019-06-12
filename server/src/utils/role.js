import HTTPStatus from 'http-status';

export function isAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}

export function isOwnOrAdmin(req, res, next) {
  if (req.user.role === 'admin' || req.params.id === req.user._id.toString()) {
    return next();
  }
  return res.sendStatus(HTTPStatus.FORBIDDEN);
}
