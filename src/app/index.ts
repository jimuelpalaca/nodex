import cors from 'cors';
import 'reflect-metadata';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import corsConfig from './config/cors';
import apiRouter from '../routes/api.routes';
import webRouter from '../routes/web.routes';
import ApiResponse from './http/response/ApiResponse';
import { createConnection } from 'typeorm';
import User from '../modules/users/domain/entity/User';

// Initialize dotEnv configuration
dotEnv.config();

createConnection()
    .then(async connection => {
        connection.getRepository(User);

        const app = express();
        const { RestApiResponse } = new ApiResponse();

        app.use(cors(corsConfig));
        app.use(bodyParser.json());
        app.use(RestApiResponse);
        app.use('', webRouter);
        app.use('/api', apiRouter);

        app.listen(process.env.APP_PORT, () => {
            console.log(`${process.env.APP_NAME} server started at http://localhost:${process.env.APP_PORT}`);
        });
    })
    .catch(error => console.log('TypeORM connection error: ', error.message));
