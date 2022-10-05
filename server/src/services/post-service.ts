import { IPost } from "../api/interfaces";
import { loadAllPosts, savePostToDB } from "../models/post-model";

export const savePost = async (post: IPost): Promise<Array<IPost>> => {
  if (!post.text || post.text === "") {
    throw new Error ("Invalid text")
  }
  post.timeStamp = new Date()
  await savePostToDB(post)
  return await loadAllPosts()
};

export const loadPost = async (): Promise<Array<IPost>> => {
  return await loadAllPosts()
};