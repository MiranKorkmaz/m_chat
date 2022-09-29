import { IPost } from "../api/interfaces";
import { loadAllPosts, savePostToDB } from "../models/post-model";

export const savePost = async (post: IPost): Promise<Array<IPost>> => {
  if (!post.text || post.text == "" || !post.userName || post.userName == "") {
    throw new Error ("Invalid text or username")
  }
  post.timeStamp = new Date()
  await savePostToDB(post)
  return await loadAllPosts()
};

export const loadPost = async (): Promise<Array<IPost>> => {
  return await loadAllPosts()
};