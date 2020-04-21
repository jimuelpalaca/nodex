import { CorsOptions } from 'cors';

const whitelist: string[] = [];

const allowedHeaders: string[] = [];

const exposedHeaders: string[] = [];

const origin = (corsOrigin: any, callback: (error: Error, allow?: boolean) => void) => {
    if (whitelist.indexOf(corsOrigin) !== -1 || !corsOrigin) {
        return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
};

export default {
    origin,
    exposedHeaders,
    allowedHeaders,
} as CorsOptions;
