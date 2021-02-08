import { AdminRepository } from "../repositories/AdminRepository";
import { ICreateUserAdminDTO } from "../dtos/AdminDTO";

export default class AdminService {
  private readonly adminRepository: AdminRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
  }

  public async create(data: ICreateUserAdminDTO): Promise<any> {}

  public async findById(id: string): Promise<any> {}

  public async findAll(): Promise<any> {}

  public async update(id: string, data: ICreateUserAdminDTO): Promise<any> {}

  public async delete(id: string): Promise<any> {}
}
