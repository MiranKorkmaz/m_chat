import express, { Application, json } from "express";
import cors from "cors";
import { mongoDbSetUp } from "./models/post-model";
import postController from "./controllers/post-controller";

const app: Application = express();
app.use(cors()); // Configure CORS properly to secure app
app.use(json());
const port: number | string = process.env.PORT || 3001;
const mongoDbURL = "mongodb://localhost:27017/chat-app"

app.use('/posts', postController)

app.listen(port, async function () {
  await mongoDbSetUp(mongoDbURL)
  console.log(`Listening on port ${port}`)
});
