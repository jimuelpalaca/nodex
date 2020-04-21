import cors from 'cors';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import corsConfig from './config/cors';
import apiRouter from '../routes/api.routes';
import webRouter from '../routes/web.routes';
import ApiResponse from './http/response/ApiResponse';

// Initialize dotEnv configuration
dotEnv.config();

const app = express();
const { RestApiResponse } = new ApiResponse();

app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(RestApiResponse);
app.use('', webRouter);
app.use('/api', apiRouter);

app.listen(process.env.APP_PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`${process.env.APP_NAME} server started at http://localhost:${process.env.APP_PORT}`);
});
