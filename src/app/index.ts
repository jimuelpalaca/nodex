import express from "express";
import dotEnv from "dotenv";

// Initialize dotenv configuration
dotEnv.config();

const app = express();

app.listen(process.env.APP_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(
    `${process.env.APP_NAME} server started at http://localhost:${process.env.APP_PORT}`
  );
});
