const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Kein Token.' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Kein Token.' });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Ungültiger Token.' });
  }
};

module.exports = authMiddleware;