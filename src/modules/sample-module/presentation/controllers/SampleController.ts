import { Request } from 'express';
import CustomResponse from '../../../../app/http/response/CustomResponse';

class SampleController {
    public index() {
        return (req: Request, res: CustomResponse) => {
            return res.withItem({
                name: 'Jimuel Palaca',
            });
        };
    }

    public store() {
        return (req: Request, res: CustomResponse) => {
            const { first_name, last_name } = req.body;

            return res.withItem({
                name: `${first_name} ${last_name}`,
            });
        };
    }
}

export default SampleController;
