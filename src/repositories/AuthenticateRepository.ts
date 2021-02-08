import { Repository, getRepository, DeleteResult } from "typeorm";
import { Authenticate } from "../entities/AuthenticateEntity";
import { AuthenticateDTO } from "../dtos/AuthenticateDTO";

export class AuthenticateRepository {
  private readonly authenticateRepository: Repository<Authenticate>;

  constructor() {
    this.authenticateRepository = getRepository(Authenticate);
  }

  public async create(data: AuthenticateDTO): Promise<Authenticate> {
    const authenticate = await this.authenticateRepository.create(data);
    await this.authenticateRepository.save(authenticate);

    return authenticate;
  }

  public async findAll(): Promise<Authenticate[]> {
    const authenticate = await this.authenticateRepository.find();

    return authenticate;
  }

  public async findById(id: string): Promise<Authenticate | undefined> {
    const authenticate = await this.authenticateRepository.findOne(id);
    return authenticate;
  }

  public async findByUserId(id: number): Promise<Authenticate | undefined> {
    const authenticate = await this.authenticateRepository
      .createQueryBuilder("a")
      .where("a.userId = :id", { id: id })
      .getOne();
    return authenticate;
  }

  public async save(data: Authenticate): Promise<Authenticate> {
    return await this.authenticateRepository.save(data);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.authenticateRepository.delete(id);
  }
}
