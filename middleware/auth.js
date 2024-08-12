const jwt = require('jsonwebtoken');

module.exports = function (req ,res,next)  {
        // Extract the Bearer token from the Authorization header
        const authHeader = req.header('Authorization');

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const decode = jwt.verify(token,'shivam');
                req.user = decode.user;
                next();
            } catch (err) {
                console.log(err);
                res.status(500).json({ errors: [{ message: 'Something Went Wrong' }] });
            }
        } else {
            return res.status(401).json({ message: 'No token provided' });
        }
    }
