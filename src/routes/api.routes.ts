import { Router, Request } from 'express';
import CustomResponse from '../app/http/response/CustomResponse';
import sampleRouter from '../modules/sample-module/presentation/sample.routes';

const apiRouter = Router();

apiRouter.get('/', (req: Request, res: CustomResponse) => {
    res.withSuccess('Hello from Nodex');
});

apiRouter.use('/sample', sampleRouter);

export default apiRouter;
