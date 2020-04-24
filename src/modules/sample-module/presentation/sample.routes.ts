import { Router, Request } from 'express';
import SampleController from './controllers/SampleController';
import SampleValidation from './middleware/SampleValidation';
import CustomResponse from '../../../app/http/response/CustomResponse';

const sampleRouter = Router();
const sampleController = new SampleController();
const sampleValidation = new SampleValidation();

// When referencing controller to router you can to this
// Create a controller method that will accept request and response as params
sampleRouter.get('', (req: Request, res: CustomResponse) => sampleController.index(req, res));

// Or you can create a method on controller that will return a function
sampleRouter.post('', sampleValidation.rules, sampleValidation.validate(), sampleController.store());

export default sampleRouter;
