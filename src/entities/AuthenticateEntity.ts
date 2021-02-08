import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, CreateDateColumn } from "typeorm";
import { hashSync } from "bcrypt";

@Entity({ name: "AUTENTICACAO" })
export class Authenticate {
  @PrimaryGeneratedColumn("increment", { name: "ID" })
  id?: number;

  @Column({ name: "REFRESH_TOKEN" })
  refreshToken: string;

  @CreateDateColumn({ name: "DATA_CRIACAO" })
  created_at: Date;

  @Column({ name: "USUARIO_ID" })
  userId: number;

  @Column({ name: "DATA_EXPIRACAO" })
  expireDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashToken() {
    this.refreshToken = hashSync(this.refreshToken, 8);
  }
}
