const secret = "SAnchit28";
import jwt from "jsonwebtoken"
export const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers["auth-token"]
        if (!token) {
            return res.send({ errors: [{ "msg": "Please provide a auth token" }] })
        }
        const data = await jwt.verify(token, secret)
        if(!data){
            req.user("Invalid token")
            return res.send("Invalid token")

        }
        req.user=data
        next()
    } catch (error) {
        console.log(error)
    }
}