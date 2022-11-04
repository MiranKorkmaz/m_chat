import express, { Application, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoDbSetUp } from "./models/post-model";
import postController from "./controllers/post-controller";

dotenv.config();

const app: Application = express();
app.use(cors()); // Configure CORS properly to secure app
app.use(json());
const port: number | string = process.env.SERVER_PORT || 4000;
const mongoDbURL: string = process.env.MONGO_URL || "mongodb://localhost:27017/chatapp";

app.use('/posts', postController)

app.listen(port, async function () {
  await mongoDbSetUp(mongoDbURL)
  console.log(`Listening on port ${port}`)
});
