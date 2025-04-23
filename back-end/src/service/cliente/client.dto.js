import Joi from "joi";

const clienteDtoCreate = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "O nome deve ser um texto",
    "string.empty": "O nome é obrigatório",
    "string.min": "O nome deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
    "any.required": "O nome é obrigatório",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "O email deve ser um texto",
    "string.empty": "O email é obrigatório",
    "string.email": "Digite um email válido",
    "any.required": "O email é obrigatório",
  }),
  phone: Joi.string().required().messages({
    "string.base": "O telefone deve ser um texto",
    "string.empty": "O telefone é obrigatório",
    "any.required": "O telefone é obrigatório",
  }),
  address: Joi.string().required().messages({
    "string.base": "O endereço deve ser um texto",
    "string.empty": "O endereço é obrigatório",
    "any.required": "O endereço é obrigatório",
  }),
});

const clienteDtoUpdate = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    "string.base": "O nome deve ser um texto",
    "string.empty": "O nome é obrigatório",
    "string.min": "O nome deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
    "any.required": "O nome é obrigatório",
  }),
  email: Joi.string().email().messages({
    "string.base": "O email deve ser um texto",
    "string.empty": "O email é obrigatório",
    "string.email": "Digite um email válido",
    "any.required": "O email é obrigatório",
  }),
  phone: Joi.string().messages({
    "string.base": "O telefone deve ser um texto",
    "string.empty": "O telefone é obrigatório",
    "any.required": "O telefone é obrigatório",
  }),
  address: Joi.string().messages({
    "string.base": "O endereço deve ser um texto",
    "string.empty": "O endereço é obrigatório",
    "any.required": "O endereço é obrigatório",
  }),
});

export { clienteDtoCreate, clienteDtoUpdate };
