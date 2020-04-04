import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verificaToken = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers[process.env.SEGURIDAD];

    let usuarioSesion;
  
    //Try to validate the token and get data
    try {
        usuarioSesion = <any>jwt.verify(token, process.env.SEED);
        res.locals.usuarioSesion = usuarioSesion;
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
    const { usuario, email, rol } = usuarioSesion;
    if (!usuario || !email) {
        res.status(401).json({
            ok: false,
            err: 'Error token incorrecto.'
        });
        return;
    }

    const newToken = jwt.sign({ usuario, email, rol }, process.env.SEED, {
        expiresIn: process.env.CADUCIDAD_TOKEN
    });
    res.setHeader("token", newToken);
    //Call the next middleware or controller
    next();
}

export const verificaRol = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      //Get the user ID from previous midleware
      const rol = res.locals.usuarioSesion.rol;
  
      //Get user role from the database
      /* const userRepository = getRepository(User);
      let user: User;
      try {
        user = await userRepository.findOneOrFail(id);
      } catch (id) {
        res.status(401).send();
      } */
  
      //Check if array of authorized roles includes the user's role
      if (roles.indexOf(rol) > -1) next();
      else res.status(401).json({
          ok: false,
          err: 'Rol Invalido'
      });
    };
  };
