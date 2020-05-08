import { Response as ExpressResponse } from 'express';
import Transformer from '../mapper/Transformer';

interface NodexResponse extends ExpressResponse {
    withSuccess(message: string, metaData?: any[]): void;
    withItem(data: any, transformer?: Transformer<any>): void;
    withCollection(data: any[], transformer?: Transformer<any>): void;
    withException(exception: Error): void;
    withErrors(errors: any[], message?: string): void;
    errorUnauthorized(message: string): void;
    errorNotFound(message: string): void;
    errorUnprocessableEntity(message: string): void;
}

export default NodexResponse;
