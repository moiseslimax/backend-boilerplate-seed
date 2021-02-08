import * as sinon from "sinon";
import request from "supertest";
import app from "../../src/app";
import { ConnectionManager, Repository, Connection } from "typeorm";
import jwt from "jsonwebtoken";
import { Admin } from "../../src/entities/AdminEntity";
import { ICreateUserAdminDTO } from "../../src/dtos/AdminDTO";
import AdminService from "../../src/services/AdminService";

const image: any = {
  name: "imagem do google",
  size: "500",
  base64: "base64",
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

const header = {
  authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInN0YXlMb2dnZWQiOmZhbHNlLCJyZWZyZXNoVG9rZW4iOiJhZjQ1NjVjMi1hN2ZiLTRkYTItOTk1MS05NTUzYWVjNTkzY2EiLCJpYXQiOjE2MTA2NjMyNTksImV4cCI6MTYxMDc0OTY1OX0.pdAMCYZRXTp4mE7V6ZATLjRxhppdS4GMXRtGncbzthE",
  "Content-Type": "application/json",
};
describe("Testing #AdminController", () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.stub(ConnectionManager.prototype, "get").returns(({
      getRepository: sandbox.stub().returns(sinon.createStubInstance(Repository)),
    } as unknown) as Connection);
    sandbox.stub(jwt, "verify").callsFake(() => {
      return {
        success: "Token is valid",
        payload: { token: "aisdaposd" },
      };
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
  test("Method create must return status 500 (params error)", async (done) => {
    const result = await request(app).post("/admin/create").send();

    expect(result.status).toBe(500);
    done();
  });

  test("Method create must return status 200", async (done) => {
    sandbox.stub(AdminService.prototype, "create").resolves(returnDataMock);
    const result = await request(app).post("/admin/create").send(inputDataMock);
    expect(result.status).toBe(200);
    done();
  });

  test("Method findById must return status 200", async (done) => {
    sandbox.stub(AdminService.prototype, "findById").resolves(returnDataMock);

    const result = await request(app).get("/admin/search/1").set(header);
    expect(result.status).toBe(200);
    done();
  });
  test("Method findAll must return status 200", async (done) => {
    sandbox.stub(AdminService.prototype, "findAll").resolves([returnDataMock]);

    const result = await request(app).get("/admin/search").set(header);
    expect(result.status).toBe(200);
    done();
  });
  test("Method update must return status 200", async (done) => {
    sandbox.stub(AdminService.prototype, "update").resolves(returnDataMock);

    const result = await request(app).put("/admin/update/1").set(header).send(inputDataMock);
    expect(result.status).toBe(200);
    done();
  });
});
