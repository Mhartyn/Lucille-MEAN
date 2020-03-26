import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verificaToken = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["auth"];

    let jwtPayload;
  
    //Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, "config.jwtSecret");
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).json({
            ok: false,
            err: 'Error al leer el token'
        });
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, "config.jwtSecret", {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
}
