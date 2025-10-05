import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();


export function authenticateToken(req, res, next) {
    const token = req.cookies.token; // read cookie
    if(token == null){
        return res.status(401).send("Authentication Failed")
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if(err){
            return res.status(403).send("invalid token")
        }
        req.user = user
        next()
    })
}