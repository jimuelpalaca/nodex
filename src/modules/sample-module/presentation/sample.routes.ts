import { Router } from 'express';
import SampleController from './controllers/SampleController';
import SampleValidation from './middleware/SampleValidation';

const sampleRouter = Router();
const sampleController = new SampleController();
const sampleValidation = new SampleValidation();

sampleRouter.get('', sampleController.index());
sampleRouter.post('', sampleValidation.rules, sampleValidation.validate(), sampleController.store());

export default sampleRouter;
