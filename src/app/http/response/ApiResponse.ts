import { NextFunction, Request, Response } from 'express';
import CustomResponse from './CustomResponse';
import Transformer from "../mapper/Transformer";

class ApiResponse {
    private static res: Response;

    RestApiResponse = (req: Request, res: CustomResponse, next: NextFunction) => {
        ApiResponse.res = res;

        res.withSuccess = ApiResponse.withSuccess;
        res.withItem = ApiResponse.withItem;
        res.withException = ApiResponse.withException;
        res.errorUnprocessableEntity = ApiResponse.unprocessableEntity;
        res.errorUnauthorized = ApiResponse.unauthorized;

        next();
    };

    private static withSuccess(message: string = 'OK'): void {
        return ApiResponse.res
            .status(200)
            .json({ message })
            .end();
    }

    private static withItem(datum: any, transformer?: Transformer<any>): void {
        if (transformer) {
            datum = transformer.transform(datum);
        }

        return ApiResponse.res
            .status(200)
            .json({ data: datum })
            .end();
    }

    private static withException(exception: Error): void {
        const { message } = exception;

        return ApiResponse.res
            .status(500)
            .json({ message })
            .end();
    }

    private static unprocessableEntity(errors: any[], message?: string): void {
        return ApiResponse.res
            .status(422)
            .json({
                errors,
                message,
            })
            .end();
    }

    private static unauthorized(message: string = 'Access denied'): void {
        return ApiResponse.res
            .status(401)
            .json({ message })
            .end();
    }
}

export default ApiResponse;
