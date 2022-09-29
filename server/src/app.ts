import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { IPost } from "./api/interfaces";
import { mongoDbSetUp } from "./models/post-model";

const app: Application = express();
app.use(cors()); // Configure CORS properly to secure app
app.use(json());
const port: number | string = process.env.PORT || 3001;
const mongoDbURL = "mongodb://localhost:27017/chat-app"

app.get('/', (req: Request, res: Response<IPost>) => {
  res.send({
    text: "HI!!!!",
    timeStamp: new Date()
  })
});

app.listen(port, async function () {
  await mongoDbSetUp(mongoDbURL)
  console.log(`Listening on port ${port}`)
});
