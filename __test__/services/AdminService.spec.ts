import * as sinon from "sinon";
import { ConnectionManager, Repository, Connection } from "typeorm";
import { File } from "../../src/entities/FileEntity";
import { ICreateUserAdminDTO } from "../../src/dtos/AdminDTO";
import { Admin } from "../../src/entities/AdminEntity";
import { AdminRepository } from "../../src/repositories/AdminRepository";
import AdminService from "../../src/services/AdminService";

const image: File = {
  id: 1,
  url_image: "www.google.com",
  name: "imagem do google",
  size: "500",
};

const returnDataMock: Admin = {
  id: 123,
  name: "Augusto Miro",
  email: "augusto@hotmail.com",
  password: "augusto123",
  phone: "5511999090675",
  role: "Administrador",
  hashPassword: () => {
    "teste";
  },
  loadTempPassword() {
    this.tempPassword = this.password;
  },
  image,
};

const inputDataMock: ICreateUserAdminDTO = {
  name: "Augusto Miro",
  email: "augusto@hotmail.com",
  password: "augusto123",
  phone: "5511999090675",
  role: "Administrador",
  image,
};

describe("Testing #AdminService", () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.stub(ConnectionManager.prototype, "get").returns(({
      getRepository: sandbox.stub().returns(sinon.createStubInstance(Repository)),
    } as unknown) as Connection);
  });

  afterEach(() => {
    sandbox.restore();
  });
  test("Method Create must return a Admin", async () => {
    const adminService = new AdminService();

    sandbox.stub(AdminRepository.prototype, "findByEmail").resolves(undefined);

    sandbox.stub(AdminRepository.prototype, "create").resolves(returnDataMock);

    const response = await adminService.create(inputDataMock);

    expect(response).toBe(returnDataMock);
  });

  test("Method findById must return a Admin", async () => {
    const adminService = new AdminService();

    sandbox.stub(AdminRepository.prototype, "findById").resolves(returnDataMock);

    const response = await adminService.findById("1");

    expect(response).toBe(returnDataMock);
  });

  test("Method findAll must return a array of Admins", async () => {
    const adminService = new AdminService();

    sandbox.stub(AdminRepository.prototype, "findAll").resolves([returnDataMock]);

    const response = await adminService.findAll();
    expect(response).toStrictEqual([returnDataMock]);
  });

  test("Method update must return a Admin", async () => {
    const adminService = new AdminService();

    sandbox.stub(AdminRepository.prototype, "findById").resolves(returnDataMock);

    sandbox.stub(AdminRepository.prototype, "save").resolves(returnDataMock);

    const response = await adminService.update("id", inputDataMock);

    expect(response).toBe(returnDataMock);
  });
});
