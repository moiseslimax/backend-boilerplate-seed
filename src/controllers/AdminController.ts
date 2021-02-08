import { Request, Response } from "express";
import AdminService from "services/AdminService";
import { ProcessError } from "../utils/errors/processError";

export default class AdminController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const adminService = new AdminService();
      const user = await adminService.create(req.body);
      return res.status(200).json(user);
    } catch (err) {
      return ProcessError(res, err);
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const adminService = new AdminService();
      const userAdmin = await adminService.findById(id);
      return res.json(userAdmin);
    } catch (err) {
      return ProcessError(res, err);
    }
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    try {
      const adminService = new AdminService();
      const adminList = await adminService.findAll();
      return res.status(200).json({ adminList });
    } catch (err) {
      return ProcessError(res, err);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const adminService = new AdminService();
      const admin = await adminService.update(id, req.body);
      return res.status(200).json(admin);
    } catch (err) {
      return ProcessError(res, err);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const adminService = new AdminService();
      const admin = await adminService.delete(id);
      return res.status(200).json(admin);
    } catch (err) {
      return ProcessError(res, err);
    }
  }
}
