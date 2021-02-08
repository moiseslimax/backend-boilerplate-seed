import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  AfterLoad,
  OneToOne,
  ManyToOne,
} from "typeorm";

import { IsEmail, IsOptional } from "class-validator";
import { hashSync } from "bcrypt";

@Entity({ name: "USUARIO_ADMINISTRADOR" })
export class Admin {
  @PrimaryGeneratedColumn("increment", { name: "ID" })
  id: number;

  @Column({ name: "NOME" })
  name: string;

  @Column({ unique: true, name: "EMAIL" })
  @IsEmail()
  email: string;

  @Column({ name: "TELEFONE" })
  phone: string;

  @Column({ name: "SENHA" })
  password: string;

  @Column({ name: "CARGO" })
  role: string;

  @AfterLoad()
  loadTempPassword() {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password !== this.tempPassword) this.password = hashSync(this.password, 8);
  }

  public tempPassword?: string;
}
