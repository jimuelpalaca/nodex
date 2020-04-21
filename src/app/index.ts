import cors from 'cors';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import corsConfig from './config/cors';

// Initialize dotEnv configuration
dotEnv.config();

const app = express();

app.use(cors(corsConfig));
app.use(bodyParser.json());

app.listen(process.env.APP_PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`${process.env.APP_NAME} server started at http://localhost:${process.env.APP_PORT}`);
});
