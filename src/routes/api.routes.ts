import { Router, Request } from 'express';
import CustomResponse from '../app/services/responses/CustomResponse';

const apiRouter = Router();

apiRouter.get('/', (req: Request, res: CustomResponse) => {
    res.withSuccess('Hello from Nodex');
});

export default apiRouter;
