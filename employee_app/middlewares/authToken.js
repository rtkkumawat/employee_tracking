const jwt = require("jsonwebtoken");

module.exports = {
    empAuthentication: async (req, res, next) => {
        const authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            let token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        success: false,
                        message: "token not authenticated"
                    });
                } else {
                    req.user = decoded.userData;
                    console.log(decoded.userData);
                    next();
                }
            });
        } else {
            res.send(400).json({
                success: false,
                message: "token not authenticated"
            })
        }
    }
}