export const authMiddleware = async (req, res, next) => {
  const authorization = req.header('Authorization');

  if (authorization) {
    const pieces = authorization.split(' ');
    if (pieces.length !== 2 || pieces[0] !== 'Bearer') {
      next();
      return;
    }
    req.bearer_token = pieces[1].trim();
    delete req.headers['authorization'];
  }
  if (req.query.token) {
    req.bearer_token = req.query.token;
  }
  next();
};
