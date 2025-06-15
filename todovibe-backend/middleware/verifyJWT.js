const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid.' });
        }

        req.user = decoded; 
        next(); 
    });
};

module.exports = verifyJWT;
