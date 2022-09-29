import express, { Request, Response } from "express";
import { IPost } from "../api/interfaces";
import { loadPost, savePost } from "../services/post-service";

const postController = express.Router();

postController.get('/', async (req: Request, res: Response<Array<IPost>>) => {
  res.send(await loadPost())
});

postController.post('/', async (req: Request, res: Response<Array<IPost>>) => {
 try {
   res.send(await savePost(req.body))
 } catch {
   res.sendStatus(404)
 }
});

export default postController;