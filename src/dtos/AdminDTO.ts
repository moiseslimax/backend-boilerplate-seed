import { TypeAnalyst } from "../entities/TypeAnalyst";
import { File } from "../entities/FileEntity";

export interface ICreateUserAdminDTO {
  name: string;
  password?: string;
  email: string;
  phone: string;
  role: string;
  typeAnalyst?: TypeAnalyst;
  image: File;
}
