import express from 'express'
import * as usersControllers from '../../controllers/user-controllers/userController'

const router = express.Router()

router.post("/signup", (req, res) => {
    usersControllers.signup(req, res)
})

router.post("/signin", (req, res) => {
    usersControllers.signin(req, res)
})

router.post("/logout", (req, res) => {
    usersControllers.logout(req, res)
})

router.post("/refresh", (req, res) => {
    usersControllers.refresh(req, res)
})

router.delete("/delete/:id", (req, res) => {
    usersControllers.deleteUser(req, res)
})

router.get("/user/:id", (req, res) => {
    usersControllers.getUser(req, res)
})

router.get("/users", (req, res) => {
    usersControllers.getUsers(req, res)
})

export default router