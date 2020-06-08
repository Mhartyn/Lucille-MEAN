import {Router, Request, Response} from 'express';

const hello = Router();

hello.get('/hello', (req: Request, res: Response) => {
    res.json('hello');
});

export default hello;