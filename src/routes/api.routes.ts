import { Router, Request, Response } from 'express';

const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

export default apiRouter;
