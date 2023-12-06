require("dotenv").config(); 
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.headers);
    if (req.headers.authorization) {
      
      const token = req.headers.authorization.split(" ")[1]; console.log(token);
      if (token) {
        const payload = jwt.verify(token, process.env.SECRET);
        if (payload) {

          req.user = payload;
          next();
        } else {
          res.status(403).json({ error: "token verification failed" });
        }
      } else {
        res.status(400).json({ error: "Malformed auth header" });
      }
    } else {
      res.status(401).json({ error: "No authorization header" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  isLoggedIn,
};