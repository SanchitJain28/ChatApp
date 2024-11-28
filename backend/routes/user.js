import { Router } from 'express';
import {userModel as User} from '../Schemmas/UserSchemma.js'
//BICRYPT
import bcrypt from 'bcryptjs'
var salt = bcrypt.genSaltSync(10);

//JSONWEBTOOKEN
import jwt from 'jsonwebtoken'
const secret = "SAnchit28";

//EXpress validator
import { body, validationResult } from "express-validator";

//express Router
export const router = Router();

router.get("/api/test", (req, res) => {
    res.send({ "Testing": "Hey it is running" })
})

router.post("/api/createuser",
    body("email").notEmpty().withMessage("email feild cannot be empty!!!").isEmail().withMessage("this is not a valid email!!"),
    body("password").notEmpty().withMessage("Password Cannot be empty!!"),
    body("name").notEmpty().withMessage("name Cannot be empty!!"),
    body("phoneNo").notEmpty().withMessage("PhoneNo Cannot be empty!!"), async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array(), success: "false" });
        }
        const isuser = await User.findOne({ email: req.body.email })
        if (isuser) {
            return res.send({ errors: [{ msg: "User Already there" }] })
        }
        const password = await bcrypt.hash(req.body.password, salt)
        const user = new User({
            name: req.body.name,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            password: password
        })
        const token = jwt.sign({ user_id: user.id, email: user.email }, secret)
        await user.save();

        res.send({ user: user, token: token, })

    })

    router.post("/api/login", body("email").notEmpty().withMessage("Email cannot be empty").isEmail().withMessage("Please Enter the correct email"),
    body("password").notEmpty().withMessage("Password cannot be empty"), async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.send({ errors: [{ msg: "Please register on this app" }] })
        }
        const isPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isPassword) {
            return res.send({ errors: [{ msg: "Password is Incorrect" }] })
        }
        const token = jwt.sign({ user_id: user.id, email: user.email }, secret)

        res.send({ token: token, user: user })
    })