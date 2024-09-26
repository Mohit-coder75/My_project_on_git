import express from "express";
import UserController from "../controller/user.controller.js";

const router = express.Router();
const userController = new UserController();

//routes...........

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);
router.get('/login',userController.getLogin);
router.post('/login',userController.postLogin);


export default router;