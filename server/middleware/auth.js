// middleware/auth.js
const jwt = require('jsonwebtoken');

//middleware to authenticate Token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
// Middleware to check user roles
function authorizeRole(requiredRole) {
    return (req, res, next) => {
        if (req.user && req.user.role === requiredRole) {
            next();
        } else {
            res.sendStatus(403);//// Unauthorized
        }
    };
}
module.exports = { authenticateToken, authorizeRole };