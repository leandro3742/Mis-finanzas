// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ message: 'No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'Token no válido o expirado' });
  }
}

module.exports = { verifyToken };
