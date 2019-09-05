const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.get('Authorization').slice('Bearer '.length);

    jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
        if (error) {
            res.status(409).json({
                error: error.message
            });
        }
        if (decoded) {
            next();
        }
    });
}

module.exports = verifyToken;