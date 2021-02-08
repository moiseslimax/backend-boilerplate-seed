import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1602871477905 implements MigrationInterface {
  name = "firstMigration1602871477905";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "CARGO" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "CARGO" varchar2(255) NOT NULL, "PERMISSAO" number NOT NULL, CONSTRAINT "PK_27ceaebfbdf348e2af70da97bbb" PRIMARY KEY ("ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "USUARIO_ADMINISTRADOR" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "NOME" varchar2(255) NOT NULL, "EMAIL" varchar2(255) NOT NULL, "TELEFONE" varchar2(255) NOT NULL, "SENHA" varchar2(255) NOT NULL, "CHAVE_IMAGEM" varchar2(255), "ROLE_ID" number, CONSTRAINT "UQ_ab63cd05fb7066aea804925672b" UNIQUE ("EMAIL"), CONSTRAINT "PK_841f7ea5f2ffeac694903bfc403" PRIMARY KEY ("ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "LAVANDERIA" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "NOME" varchar2(255) NOT NULL, "LAVANDERIA_URL" varchar2(255) NOT NULL, CONSTRAINT "PK_e3ecb96b42f803b4b50f93c36d6" PRIMARY KEY ("ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "TIPO_SOLICITACAO" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "TIPO" varchar2(50) NOT NULL, "DESCRICAO" varchar2(150) NOT NULL, "DELETED_AT" number, CONSTRAINT "PK_48dcdba823cc36fe5f8e0a9db33" PRIMARY KEY ("ID"))`
    );

    await queryRunner.query(
      `CREATE TABLE "SOLICITACAO" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "DESCRICAO" varchar2(255) NOT NULL, "SITUATION" varchar2(255) NOT NULL, "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "TIPO_SOLICITACAO" number, "USER_ID" number, CONSTRAINT "PK_48e49928ff43fdec699df67ebb1" PRIMARY KEY ("ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "USUARIO" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "NOME" varchar2(255) NOT NULL, "EMAIL" varchar2(255) NOT NULL, "TELEFONE" varchar2(255) NOT NULL, "DATA_NASCIMENTO" timestamp NOT NULL, "DESCRICAO" varchar2(255), "SENHA" varchar2(255) NOT NULL, "ENDEREÇO" varchar2(255), "CURSO" varchar2(255), "WHATSAPP" varchar2(255), "FACEBOOK" varchar2(255), "INSTAGRAM" varchar2(255), "SPOTIFY" varchar2(255), "LINKEDIN" varchar2(255), "TWITTER" varchar2(255), "FOTO_PERFIL" varchar2(255), "MOSTRAR_WHATSAPP" number NOT NULL, "EDIFICIO_ID" number, CONSTRAINT "UQ_c756f6732c021b95d784de956c6" UNIQUE ("EMAIL"), CONSTRAINT "PK_6a1a5c190d01ced822dd7c35d76" PRIMARY KEY ("ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "EDIFICIO" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "NOME" varchar2(255) NOT NULL, "STATUS" varchar2(255) NOT NULL, "TELEFONE" varchar2(255) NOT NULL, "VOLTAGEM" varchar2(255) NOT NULL, "GERENTE" varchar2(255) NOT NULL, "ENDERECO" varchar2(255) NOT NULL, "BAIRRO" varchar2(255), "HORA_ABERTURA" varchar2(255), "HORA_FECHAMENTO" varchar2(255), "SEMPRE_ABERTO" number NOT NULL, "CEP" varchar2(255), "REGIAO" varchar2(255), "URL_IMAGEM" varchar2(255), CONSTRAINT "PK_a39d87a4795a9178459c6da0d19" PRIMARY KEY ("ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "INFORMACAO_EMPRESA" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "NOME_COMPANHIA" varchar2(255) DEFAULT 'SHARE', "URL_OBTER_APOIO" varchar2(255) NOT NULL, CONSTRAINT "PK_1b4cd973d1533745dc69d880b99" PRIMARY KEY ("ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "EDIFICIO_LAVANDERIA" ("EDIFICIO_ID" number NOT NULL, "LAVANDERIA_ID" number NOT NULL, CONSTRAINT "PK_420b2ce023edf9335c4af473f82" PRIMARY KEY ("EDIFICIO_ID", "LAVANDERIA_ID"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_4de05202f19a6233b30caa1048" ON "EDIFICIO_LAVANDERIA" ("EDIFICIO_ID")`);
    await queryRunner.query(`CREATE INDEX "IDX_eda5520c6f64e632d488733960" ON "EDIFICIO_LAVANDERIA" ("LAVANDERIA_ID")`);
    await queryRunner.query(
      `CREATE TABLE "EDIFICIO_TIPO_SOLICITACAO" ("EDIFICIO_ID" number NOT NULL, "TIPO_SOLICITACAO_ID" number NOT NULL, CONSTRAINT "PK_2bab282f92a2a35209441f36331" PRIMARY KEY ("EDIFICIO_ID", "TIPO_SOLICITACAO_ID"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5c59a33b22713866199ddbd21f" ON "EDIFICIO_TIPO_SOLICITACAO" ("EDIFICIO_ID")`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_705ff54e21770c61521d7bf6e1" ON "EDIFICIO_TIPO_SOLICITACAO" ("TIPO_SOLICITACAO_ID")`
    );
    await queryRunner.query(
      `ALTER TABLE "USUARIO_ADMINISTRADOR" ADD CONSTRAINT "FK_2d40af84ccfc10402f7ed89acf2" FOREIGN KEY ("ROLE_ID") REFERENCES "CARGO" ("ID")`
    );

    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO" ADD CONSTRAINT "FK_dacc5a6a33545fa60c9c6b052fd" FOREIGN KEY ("TIPO_SOLICITACAO") REFERENCES "TIPO_SOLICITACAO" ("ID")`
    );
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO" ADD CONSTRAINT "FK_fc580e5d4d212eec336113a041e" FOREIGN KEY ("USER_ID") REFERENCES "USUARIO" ("ID")`
    );
    await queryRunner.query(
      `ALTER TABLE "USUARIO" ADD CONSTRAINT "FK_a44571baca7fea6a345f5b169ca" FOREIGN KEY ("EDIFICIO_ID") REFERENCES "EDIFICIO" ("ID")`
    );
    await queryRunner.query(
      `ALTER TABLE "EDIFICIO_LAVANDERIA" ADD CONSTRAINT "FK_4de05202f19a6233b30caa1048e" FOREIGN KEY ("EDIFICIO_ID") REFERENCES "EDIFICIO" ("ID") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "EDIFICIO_LAVANDERIA" ADD CONSTRAINT "FK_eda5520c6f64e632d488733960b" FOREIGN KEY ("LAVANDERIA_ID") REFERENCES "LAVANDERIA" ("ID") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "EDIFICIO_TIPO_SOLICITACAO" ADD CONSTRAINT "FK_5c59a33b22713866199ddbd21f2" FOREIGN KEY ("EDIFICIO_ID") REFERENCES "EDIFICIO" ("ID") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "EDIFICIO_TIPO_SOLICITACAO" ADD CONSTRAINT "FK_705ff54e21770c61521d7bf6e1a" FOREIGN KEY ("TIPO_SOLICITACAO_ID") REFERENCES "TIPO_SOLICITACAO" ("ID") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "EDIFICIO_TIPO_SOLICITACAO" DROP CONSTRAINT "FK_705ff54e21770c61521d7bf6e1a"`);
    await queryRunner.query(`ALTER TABLE "EDIFICIO_TIPO_SOLICITACAO" DROP CONSTRAINT "FK_5c59a33b22713866199ddbd21f2"`);
    await queryRunner.query(`ALTER TABLE "EDIFICIO_LAVANDERIA" DROP CONSTRAINT "FK_eda5520c6f64e632d488733960b"`);
    await queryRunner.query(`ALTER TABLE "EDIFICIO_LAVANDERIA" DROP CONSTRAINT "FK_4de05202f19a6233b30caa1048e"`);
    await queryRunner.query(`ALTER TABLE "USUARIO" DROP CONSTRAINT "FK_a44571baca7fea6a345f5b169ca"`);
    await queryRunner.query(`ALTER TABLE "SOLICITACAO" DROP CONSTRAINT "FK_fc580e5d4d212eec336113a041e"`);
    await queryRunner.query(`ALTER TABLE "SOLICITACAO" DROP CONSTRAINT "FK_dacc5a6a33545fa60c9c6b052fd"`);
    await queryRunner.query(`ALTER TABLE "USUARIO_ADMINISTRADOR" DROP CONSTRAINT "FK_2d40af84ccfc10402f7ed89acf2"`);
    await queryRunner.query(`DROP INDEX "IDX_705ff54e21770c61521d7bf6e1"`);
    await queryRunner.query(`DROP INDEX "IDX_5c59a33b22713866199ddbd21f"`);
    await queryRunner.query(`DROP TABLE "EDIFICIO_TIPO_SOLICITACAO"`);
    await queryRunner.query(`DROP INDEX "IDX_eda5520c6f64e632d488733960"`);
    await queryRunner.query(`DROP INDEX "IDX_4de05202f19a6233b30caa1048"`);
    await queryRunner.query(`DROP TABLE "EDIFICIO_LAVANDERIA"`);
    await queryRunner.query(`DROP TABLE "INFORMACAO_EMPRESA"`);
    await queryRunner.query(`DROP TABLE "EDIFICIO"`);
    await queryRunner.query(`DROP TABLE "USUARIO"`);
    await queryRunner.query(`DROP TABLE "SOLICITACAO"`);
    await queryRunner.query(`DROP TABLE "TIPO_SOLICITACAO"`);
    await queryRunner.query(`DROP TABLE "LAVANDERIA"`);
    await queryRunner.query(`DROP TABLE "USUARIO_ADMINISTRADOR"`);
    await queryRunner.query(`DROP TABLE "CARGO"`);
  }
}