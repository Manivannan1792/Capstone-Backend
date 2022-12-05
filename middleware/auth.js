import jwt from "jsonwebtoken";
import {User} from "../userModel.js"
import dotenv from "dotenv";
dotenv.config();
export const authUser = async (req, res, next) => {

    try {
        const userToken = req.header('Authorization').replace('Bearer ', "") ;
        const decodedToken = jwt.verify(userToken,process.env.SECRET_KEY);
        const user = await User.findOne({_id: decodedToken._id});
        if(!user) {
            return res.status(404).json('please authenticate');
        }
        req.user=user;
        next();
    }catch(err) {
        console.log(err);
        res.status(500).send()
    }
}







// export const auth = (req, res, next) => {
//     try {
//     const token = req.header("x-auth-token");
//     jwt.verify(token,process.env.SECRET_KEY);
//     next();
// }
//     catch (err) {res.status(401).send({error:err.message});
// }
// }
