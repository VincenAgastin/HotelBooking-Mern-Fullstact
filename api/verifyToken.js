const jwt = require('jsonwebtoken');

// Token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; 
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }
    
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            
            return res.status(403).json({ message: "Token verification error", error: err.message });
        }
        req.user = user;
        next(); 
    });
};

// User authorization middleware
const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next(); 
        } else {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }
    });
};

// Admin authorization middleware
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next(); 
        } else {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }
    });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
