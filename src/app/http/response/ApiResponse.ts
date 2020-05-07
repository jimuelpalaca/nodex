import { NextFunction, Request, Response as ExpressResponse } from 'express';
import NodexResponse from './NodexResponse';
import Transformer from '../mapper/Transformer';
import ResponseCode from './ResponseCode';

class ApiResponse {
    private static res: ExpressResponse;

    RestApiResponse = (req: Request, res: NodexResponse, next: NextFunction) => {
        ApiResponse.res = res;

        res.withSuccess = ApiResponse.withSuccess;
        res.withItem = ApiResponse.withItem;
        res.withCollection = ApiResponse.withCollection;
        res.withException = ApiResponse.withException;
        res.withErrors = ApiResponse.withErrors;
        res.errorUnauthorized = ApiResponse.unauthorized;
        res.errorNotFound = ApiResponse.notFound;
        res.errorUnprocessableEntity = ApiResponse.unprocessableEntity;

        next();
    };

    private static withSuccess(message: string = 'OK'): void {
        return ApiResponse.res
            .status(ResponseCode.HTTP_OK)
            .json({ message })
            .end();
    }

    private static withItem(datum: any, transformer?: Transformer<any>): void {
        if (transformer) {
            datum = transformer.transform(datum);
        }

        return ApiResponse.res
            .status(ResponseCode.HTTP_OK)
            .json({ data: datum })
            .end();
    }

    private static withCollection(data: any, transformer?: Transformer<any>): void {
        if (transformer) {
            data = data.map((datum: any) => transformer.transform(datum));
        }

        return ApiResponse.res
            .status(ResponseCode.HTTP_OK)
            .json({ data })
            .end();
    }

    private static withException(exception: Error): void {
        const { message } = exception;

        return ApiResponse.res
            .status(ResponseCode.HTTP_INTERNAL_SERVER_ERROR)
            .json({ message })
            .end();
    }

    private static withErrors(errors: any[], message?: string): void {
        return ApiResponse.res
            .status(ResponseCode.HTTP_UNPROCESSABLE_ENTITY)
            .json({
                errors,
                message,
            })
            .end();
    }

    private static unauthorized(message: string = 'Access denied'): void {
        return ApiResponse.res
            .status(ResponseCode.HTTP_UNAUTHORIZED)
            .json({ message })
            .end();
    }

    private static notFound(message: string = 'Not Found'): void {
        return ApiResponse.res
            .status(ResponseCode.HTTP_NOT_FOUND)
            .json({ message })
            .end();
    }

    private static unprocessableEntity(message: string = 'Not Found'): void {
        return ApiResponse.res
            .status(ResponseCode.HTTP_UNPROCESSABLE_ENTITY)
            .json({ message })
            .end();
    }
}

export default ApiResponse;
