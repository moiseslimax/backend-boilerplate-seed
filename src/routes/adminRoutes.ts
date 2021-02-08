import { Router } from "express";
import { validateCreateAdmin, validateLoginAdmin } from "../schemas/adminSchema";
import AdminController from "../controllers/AdminController";
import auth from "../middlewares/auth";

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.post("/create", validateCreateAdmin, adminController.create);
adminRouter.get("/search", auth, adminController.findAll);
adminRouter.get("/search/:id", auth, adminController.findById);
adminRouter.put("/update/:id", auth, adminController.updateUser);
adminRouter.delete("/delete/:id", auth, adminController.delete);

export default adminRouter;
