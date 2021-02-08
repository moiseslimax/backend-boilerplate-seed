import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { error } from "../utils/constants/ErrorConstants";

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).send({
        status: 401,
        message: "Unauthorized",
      });
    }
    let url = req.baseUrl + req.path;
    url = url.replace(/[\d]/g, "");

    const token = authorization.replace("Bearer ", "").trim();

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        status: "401",
        message: "Token expirado",
      });
    }

    return res.status(401).send({
      status: "401",
      message: "Unauthorized",
    });
  }
}
