import express from 'express';
import { userSignup,userLogin,forgotPassword,resetPassword } from '../controllers/userController.js';
const router=express.Router();
router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:id',resetPassword);

export default router;



