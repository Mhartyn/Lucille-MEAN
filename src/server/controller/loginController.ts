import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

class LoginController{
    static login = async (req: Request, res: Response)=>{
        let { email, password } = req.body;
    
        let token = <string>jwt.sign({ 
                usuario: 1 /*codigo de usuario*/, 
                email,
                rol: 'ADMIN' 
            }, 
            process.env.SEED, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        });
    
        res.json({
            ok: true,        
            token        
        });
    
    }
}

export default LoginController;