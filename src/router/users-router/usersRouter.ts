import express from 'express'
import * as usersControllers from '../../controllers/user-controller/userController'
import { LogoutSchema, SigninSchema, SignupSchema } from './schema'
import { Validator } from "express-json-validator-middleware";
import { Request } from "express"
import { checkAuthMiddleware } from '../../middleware/checkAuthMiddleware';

const router = express.Router()
const { validate } = new Validator({});

router.post("/signup", validate({ body: SignupSchema }), (req, res) => usersControllers.signup(req, res))

router.post("/signin", validate({ body: SigninSchema }), (req, res) => usersControllers.signin(req, res))

router.post("/logout", validate({ body: LogoutSchema }), checkAuthMiddleware, (req, res) => usersControllers.logout(req, res))

router.post("/signin/new_token", (req,res) => usersControllers.refresh(req, res))

router.delete("/delete/:id", checkAuthMiddleware, (req:Request<{id:string}>, res) => usersControllers.delUser(req, res))

router.get("/:id", checkAuthMiddleware, (req:Request<{id:string}>, res) => usersControllers.getUser(req, res))

export default router