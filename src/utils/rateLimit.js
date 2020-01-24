const rateLimit = require("express-rate-limit");

exports.createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 2,
    message: "Too many requests from this IP, please try again after an hour"
})