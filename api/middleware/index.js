const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Token not found");
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send("Token not valid");
    }

    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).send("User not found");
      }

      res.locals.user = user;
      next();
    } catch (error) {
      return res.status(500).send("Server error");
    }
  });
}

function checkAdmin(req, res, next) {
    if (res.locals.user.role === 'admin') {
        next()
    } else {
        return res.status(401).send('User not authorized')
    }
}

function checkMaster(req, res, next){
    if (res.locals.user.role === 'admin' || res.locals.user.role === 'master'){
        next()
    } else {
        return res.status(401).send('User not authorized')
    }
}

// function checkUser(req, res, next){
//     if (res.locals.user.role === 'admin' || res.locals.user.role === 'master' || res.locals.user.role === 'user') {
//         next()
//     } else {
//         return res.status(401).send('User not authorized')
//     }
// }

module.exports = { checkAuth, checkAdmin, checkMaster }