import { Router } from 'express';
const authenticationRouter = Router();
import { loginSchema,registerSchema } from '../middlewares/auth/authSchema.js';
import {register, login}  from '../controllers/authenticationController.js';

authenticationRouter.post('/register', registerSchema, register);
authenticationRouter.post('/login', loginSchema,login);


export default authenticationRouter;
