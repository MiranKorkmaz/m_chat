import { connect, model, Schema } from "mongoose";
import { IPost } from "../api/interfaces";

const PostSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true
  },
  timeStamp: Date,
});

const PostModel = model<IPost>("IPost", PostSchema);

export const mongoDbSetUp = async (url: string) => {
  await connect(url)
};

export const loadAllPosts = async (): Promise<Array<IPost>> => {
  return PostModel.find({}).exec()
};

export const savePostToDB = async (post: IPost): Promise<void> => {
  const model = new PostModel(post)
  await model.save()
};