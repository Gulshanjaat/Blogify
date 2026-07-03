const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.send({
        status: false,
        message: "Token Required",
      });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verify;

    next();
  } catch (error) {
    return res.send({
      status: false,
      message: "Invalid Token",
    });
  }
};

module.exports = auth;