import { Router } from 'express';

const authenticationRouter = Router();

import {register, login}  from '../controllers/authenticationController.js';

authenticationRouter.post('/register',register);
authenticationRouter.post('/login',login);

export default authenticationRouter;