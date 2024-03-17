const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token
    console.log(token)
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        req.userId = decodedToken.userId;
      } catch (error) {
        req.userId = null;
      }
    }
    next();
  };
  

  module.exports = {authMiddleware}