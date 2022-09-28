import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { PostProps } from "./api/interfaces";

const app: Application = express();
app.use(cors()); // Configure CORS properly to secure app
app.use(json());
const port: number | string = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response<PostProps>) => {
  res.send({
    text: "HI!!!!",
    timeStamp: new Date()
  })
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
});
