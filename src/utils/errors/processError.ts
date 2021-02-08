import { Response } from "express";

export const ProcessError = (res: Response, erro: any) => {
  // console.log temporário - aguardando função para criar arquivos de log
  console.log(erro);
  const statusCode = erro.status ? erro.status : 500;
  let status = null;
  if (erro.status) {
    status = {
      code: erro.status,
      message: erro.message,
    };
  }

  return res.status(statusCode).send({ status });
};
