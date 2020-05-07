import { Validation } from '../../../../app/http/middleware/Validation';
import { body } from 'express-validator';

class UserCreateValidation extends Validation {
    setRules(): any[] {
        return [
            body('firstName')
                .not()
                .isEmpty()
                .withMessage('First name is required.'),
            body('lastName')
                .not()
                .isEmpty()
                .withMessage('Last name is required.'),
            body('email')
                .not()
                .isEmpty()
                .withMessage('Email is required')
                .isEmail()
                .withMessage('Email should be a valid email address'),
            body('password')
                .not()
                .isEmpty()
                .withMessage('Password is required')
                .isLength({ min: 8 })
                .withMessage('Your password must be at least 8 characters long')
                .matches(/(?=.*[0-9])/, 'g')
                .withMessage('Your password must contain at least one (1) number')
                .matches(/(?=.*[A-Z])/, 'g')
                .withMessage('Your password must contain at least one (1) uppercase letter')
                .matches(/(?=.*[a-z])/, 'g')
                .withMessage('Your password must contain at least one (1) lowercase letter')
                .matches(/[^\\w\\s*]+/, 'g')
                .withMessage('Your password must contain at least one (1) special character'),
        ];
    }
}

export default UserCreateValidation;
