import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({
                message: "Authorization header not found!"
            });
        }

        const token = header.split(" ")[1];
        console.log(token);
        

        if (!token) {
            return res.status(401).json({
                message: "Token not found!"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log(decoded);
        

        req.user = decoded;
        console.log(req.user);
        

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token!"
        });
    }
}