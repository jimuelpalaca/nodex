import { Request } from 'express';
import CustomResponse from '../../../../app/http/response/CustomResponse';
import SampleEntity from '../../domain/entities/SampleEntity';
import SampleTransformer from '../transformers/SampleTransformer';

class SampleController {
    public index(req: Request, res: CustomResponse) {
        return res.withItem({
            name: 'Jimuel Palaca',
        });
    }

    public store() {
        return (req: Request, res: CustomResponse) => {
            const { first_name, last_name } = req.body;

            const sample = {
                first_name,
                last_name,
            } as SampleEntity;

            return res.withItem(sample, new SampleTransformer());
        };
    }
}

export default SampleController;
