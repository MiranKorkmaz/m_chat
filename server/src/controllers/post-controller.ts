import express, { Request, Response } from "express";
import { IPost } from "../api/interfaces";

const postController = express.Router();

postController.get('/', async (req: Request, res: Response<Array<IPost>>) => {
  
});

postController.post('/', async (req: Request, res: Response<Array<IPost>>) => {
  
});

export default postController;