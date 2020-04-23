import {NextFunction, Request} from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import CustomResponse from '../response/CustomResponse';

export abstract class Validation {
    constructor() {
        this.rules = this.setRules();
    }

    public rules: any[];

    public abstract setRules(): any[];

    public validate() {
        return (req: Request, res: CustomResponse, next: NextFunction) => {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                return next();
            }

            return res.errorUnprocessableEntity(Validation.formatErrors(errors));
        };
    }

    public static formatErrors(errors: Result<ValidationError>): any[] {
        return errors.array().reduce((result: any, currentValue: any) => {
            (result[currentValue.param] = result[currentValue.param] || []).push(currentValue.msg);

            return result;
        }, {});
    }
}
