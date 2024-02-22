import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const tocken = req.cookies.access_tocken;

    if(!tocken) {
        return next(errorHandler(401, "Unauthorized"));
    }
    
    jwt.verify(tocken, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(403, "Tocken is not valid!"));
        }
        req.user = user;
        next();
    });
};