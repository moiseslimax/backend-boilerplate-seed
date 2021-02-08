import { Repository, getRepository, DeleteResult } from "typeorm";
import { Admin } from "../entities/AdminEntity";
import { ICreateUserAdminDTO } from "../dtos/AdminDTO";

export class AdminRepository {
  private readonly adminRepository: Repository<Admin>;

  constructor() {
    this.adminRepository = getRepository(Admin);
  }

  public async create(data: ICreateUserAdminDTO): Promise<Admin> {
    const userAdmin = await this.adminRepository.create(data);
    await this.adminRepository.save(userAdmin);

    return userAdmin;
  }

  public async findAll(): Promise<Admin[]> {
    const admins = await this.adminRepository
      .createQueryBuilder("a")
      .leftJoinAndSelect("a.typeAnalyst", "at")
      .leftJoinAndSelect("at.solTypes", "st")
      .leftJoinAndSelect("a.image", "i")
      .getMany();

    return admins;
  }

  public async findById(id: string): Promise<Admin | undefined> {
    const admin = await this.adminRepository
      .createQueryBuilder("a")
      .leftJoinAndSelect("a.image", "i")
      .leftJoinAndSelect("a.typeAnalyst", "at")
      .leftJoinAndSelect("at.solTypes", "st")
      .where("a.id = :id", { id: id })
      .getOne();

    return admin;
  }

  public async save(data: Admin): Promise<Admin> {
    return await this.adminRepository.save(data);
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    const admin = await this.adminRepository
      .createQueryBuilder("a")
      .leftJoinAndSelect("a.typeAnalyst", "at")
      .leftJoinAndSelect("at.solTypes", "st")
      .leftJoinAndSelect("a.image", "i")
      .where("a.email = :email", { email: email })
      .getOne();

    return admin;
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.adminRepository.delete(id);
  }
}
