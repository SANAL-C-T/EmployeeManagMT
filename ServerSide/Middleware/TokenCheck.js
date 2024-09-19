const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
    console.log("auth working....");

    // Extract Authorization header
    const authHeader = req.headers['authorization'];
    console.log("Authorization header:", authHeader);

    // Check if the header starts with 'Bearer ' and extract the token
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length); // Remove 'Bearer ' prefix
        console.log("Token extracted:", token);

        // Verify the token
        jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
            if (err) {
                console.log("Token verification failed:", err.message);
                return res.sendStatus(403); // Forbidden
            }
            
            req.user = user;
            console.log("Token verified successfully. User:", user);
            next();
        });
    } else {
        console.log("Authorization header missing or incorrect format");
        return res.sendStatus(401); // Unauthorized
    }
};

module.exports = authenticateToken;
