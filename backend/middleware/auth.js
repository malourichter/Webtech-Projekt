const jwt = require('jsonwebtoken');
function adminMiddleware(req, res, next) {
 
  if (!req.user || !req.user.isAdmin) { 
    return res.status(403).json({ message: 'Nur Admins erlaubt.' });
  }
  next();
}

module.exports = adminMiddleware;