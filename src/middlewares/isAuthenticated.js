const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const access_token = req.headers.access_token;
    if (!access_token) return res.status(401).send({success: false, message: 'user is not authorized'});

    const user = verifyAuthToken(access_token);
    if (!user) return res.status(402).send({success: false, message: 'user is not authorized'});

    req.user = user;

    next();
}

const verifyAuthToken = (token) => {
    let user = null;

    try {
        
        user = jwt.verify(token, process.env.TOKEN_SECRET)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }

    return user;
}

module.exports = isAuthenticated;