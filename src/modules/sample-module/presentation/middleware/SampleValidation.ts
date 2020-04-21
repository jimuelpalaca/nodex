import { body } from 'express-validator';
import { Validation } from '../../../../app/http/middleware/Validation';

class SampleValidation extends Validation {
    setRules(): any[] {
        return [
            body('first_name')
                .not()
                .isEmpty()
                .withMessage('First name is required')
                .isLength({ min: 2 })
                .withMessage('Minimum of 2 characters'),
            body('last_name')
                .not()
                .isEmpty()
                .withMessage('Last name is required')
                .isLength({ min: 2 })
                .withMessage('Minimum of 2 characters'),
        ];
    }
}

export default SampleValidation;
