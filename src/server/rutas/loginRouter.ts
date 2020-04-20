import {Router} from 'express';
import LoginController from '../controller/loginController';

const loginRouter = Router();

loginRouter.post('/login', LoginController.login);

export default loginRouter;