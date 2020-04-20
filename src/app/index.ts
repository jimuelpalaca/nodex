import express from "express";
import dotenv from "dotenv";

dotenv.config();

const appName = process.env.APP_NAME;
const port = process.env.APP_PORT;
const app = express();

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(
    `${appName} server started at http://localhost:${port}`
  );
});
