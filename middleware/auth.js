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
        let statusCode = 403;
        let message = "Authentication failed";
        let errorCode = "AUTH_ERROR";

        switch (err.name) {
          case "TokenExpiredError":
            statusCode = 401;
            message = "Token has expired.";
            errorCode = "TOKEN_EXPIRED";
            break;

          case "JsonWebTokenError":
            statusCode = 401;
            if (err.message.includes("invalid signature")) {
              message = "Invalid token signature";
              errorCode = "INVALID_SIGNATURE";
            } else if (err.message.includes("malformed")) {
              message = "Malformed token";
              errorCode = "MALFORMED_TOKEN";
            } else {
              message = "Invalid token";
              errorCode = "INVALID_TOKEN";
            }
            break;

          case "NotBeforeError":
            statusCode = 401;
            message = "Token not active yet";
            errorCode = "TOKEN_NOT_ACTIVE";
            break;

          default:
            statusCode = 500;
            message = "Token verification failed";
            errorCode = "VERIFICATION_FAILED";
        }

        return res.status(statusCode).json({
          message: message,
        });
      }
      req.user = decoded.user
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
