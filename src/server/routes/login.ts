import {Router, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';

const login = Router();

login.post('/login', (req: Request, res: Response)=>{
    let { email, password } = req.body;

    let token = <string>jwt.sign({ email }, "config.jwtSecret", {
        expiresIn: "1h"
    });

    res.json({
        ok: true,
        email,
        token        
    });

});

export default login;