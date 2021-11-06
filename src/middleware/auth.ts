import { NextFunction, Request, Response } from "express";

export default function isLoggedin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.isAuthenticated()) next();
  } catch (error) {
    res.json(error);
  }
}
