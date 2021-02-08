import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validators/schemaValidator";

export const validateCreateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const fileSchema = Joi.object().keys({
    base64: Joi.string().required().messages({
      "any.required": "o campo base64 em images é obrigatório",
    }),
    name: Joi.string().required().messages({
      "any.required": "o campo name em images é obrigatório",
    }),
    size: Joi.string().required().messages({
      "any.required": "o campo size em images é obrigatório",
    }),
  });

  const schema = Joi.object().keys({
    name: Joi.string().max(100).min(3).required().messages({
      "string.min": "o campo name deve possuir no mínimo 3 dígitos",
      "any.required": "o campo name é obrigatório",
      "string.max": "o campo name deve possuir menos de 100 dígitos",
    }),
    phone: Joi.string().max(13).required().messages({
      "any.required": "o campo phone é obrigatório",
      "string.max": "o campo phone deve possuir no máximo 13 dígitos",
    }),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "br", "net"] },
      })
      .required()
      .messages({
        "string.email": "campo com email inválido",
        "any.required": "o campo email é obrigatório",
      }),
    password: Joi.string()
      .min(6)
      .regex(/^((?=.*[a-z])(?=.*[0-9]))/)
      .required()
      .messages({
        "string.pattern.base": "o campo password deve possuir pelo menos 1 dígito numérico e 1 dígito em letra",
        "any.required": "o campo password é obrigatório",
        "string.min": "o campo password deve ter no mínimo 6 digitos",
      }),
    image: fileSchema,
    role: Joi.string().required().messages({
      "any.required": "o campo role é obrigatório",
    }),
    typeAnalyst: Joi.optional(),
  });
  try {
    await validateBody(req, next, schema);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const validateLoginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  try {
    await validateBody(req, next, schema);
  } catch (error) {
    return res.status(500).send(error);
  }
};
