import jwt from 'jsonwebtoken';

export async function verifyToken(req , res) {
    try{
        const header = req.autorization.headers
        if(!header){
            return res.status(403).json({
                message : "Header not found!"
            })
        }
        const token = header.split(" ")[1]

        if(!token){
            return res.status(409).json({
                message : "Invalid token or Token not found!"
            })
        }

        next()
    }
    catch(error){
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}