import { Request, Response } from "express";

export interface RequestHandlerProps extends Request {
  res: Response;
}
