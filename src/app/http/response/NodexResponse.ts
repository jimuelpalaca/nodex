import { Response } from 'express';
import Transformer from '../mapper/Transformer';

interface CustomResponse extends Response {
    withSuccess(message: string, metaData?: any[]): void;
    withItem(data: any, transformer?: Transformer<any>): void;
    withCollection(data: any[], transformer?: Transformer<any>): void;
    withException(exception: Error): void;
    errorUnprocessableEntity(errors: any[], message?: string): void;
    errorUnauthorized(message: string): void;
}

export default CustomResponse;
