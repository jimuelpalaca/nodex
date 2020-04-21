import { Response } from 'express';

interface CustomResponse extends Response {
    withSuccess(message: string, metaData?: any[]): void;
    withItem(data: any, transformer?: any, metaData?: any[]): void;
    withException(exception: Error): void;
    errorUnprocessableEntity(errors: any[], message?: string): void;
    errorUnauthorized(message: string): void;
}

export default CustomResponse;
