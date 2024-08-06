import express from 'express'
import * as usersControllers from '../../controllers/user-controllers/userController'
import { DeleteUserSchema, GetUserSchema, LogoutSchema, RefreshSchema, SigninSchema, SignupSchema } from './schema'
import { Response, Request } from 'express';
import { Validator } from "express-json-validator-middleware";

const router = express.Router()
const { validate } = new Validator({});

router.post("/signup", validate({ body: SignupSchema }), (req, res) => usersControllers.signup(req, res))

router.post("/signin", validate({ body: SigninSchema }),(req, res) => usersControllers.signin(req, res))

router.post("/logout", validate({ body: LogoutSchema }),(req, res) => usersControllers.logout(req, res))

router.post("/refresh", validate({ body: RefreshSchema }),(req, res) => usersControllers.refresh(req, res))

router.delete("/delete/:id", validate({ params: DeleteUserSchema }),(req, res) => usersControllers.deleteUser(req, res))

router.get("/user/:id", validate({ params: GetUserSchema }),(req, res) => usersControllers.getUser(req, res))

router.get("/users", (req, res) => usersControllers.getUsers(req, res))

export default router