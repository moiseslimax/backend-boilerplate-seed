import { Router, Request, Response } from "express";

import adminRouter from "./adminRoutes";

const routes = Router();

routes.get("/status", (_req: Request, res: Response) => {
  return res.status(200).json({ status: "ok" });
});

routes.use("/admin", adminRouter);

export default routes;
