const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied. No Token Provided." });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: err.message,
        });
      }
      req.user = decoded;
      next();
    });
    
  } catch (error) {
    console.error("Jwt Middleware Error:", error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = authenticateToken;
