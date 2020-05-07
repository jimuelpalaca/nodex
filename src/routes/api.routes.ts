import { Router, Request } from 'express';
import Response from '../app/http/response/NodexResponse';
import userRouter from '../modules/users/presentation/user.routes';

const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response) => {
    res.withSuccess('Hello from Nodex');
});

apiRouter.use('/users', userRouter);

export default apiRouter;
