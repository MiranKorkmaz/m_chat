import { connect, model, Schema } from "mongoose";
import { IPost } from "../api/interfaces";

const PostSchema = new Schema({
  userName: String,
  text: String,
  timeStamp: Date,
});

const PostModel = model<IPost>("IPost", PostSchema);

export const mongoDbSetUp = async (url: string) => {
  await connect(url)
};