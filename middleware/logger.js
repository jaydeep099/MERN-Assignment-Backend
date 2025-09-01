const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

exports.loggingRequest = (req, res, next) => {
  logger.info(`Request ${req.method}- ${req.url}`);
  next();
};