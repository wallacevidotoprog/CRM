import Joi from "joi";

const userDtoCreate = Joi.object({
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
  password: Joi.string().min(6).max(30).required().messages({
    "string.base": "A senha deve ser um texto",
    "string.empty": "A senha é obrigatória",
    "string.min": "A senha deve ter no mínimo {#limit} caracteres",
    "string.max": "A senha deve ter no máximo {#limit} caracteres",
    "any.required": "A senha é obrigatória",
  }),
  role: Joi.string().valid("admin", "user").default("user").messages({
    "any.only": "O papel deve ser 'admin' ou 'user'",
    "string.base": "O papel deve ser um texto",
  }),
});

const userDtoUpdate = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    "string.base": "O nome deve ser um texto",
    "string.empty": "O nome não pode estar vazio",
    "string.min": "O nome deve ter no mínimo {#limit} caracteres",
    "string.max": "O nome deve ter no máximo {#limit} caracteres",
  }),
  email: Joi.string().email().messages({
    "string.base": "O email deve ser um texto",
    "string.empty": "O email não pode estar vazio",
    "string.email": "Digite um email válido",
  }),
  password: Joi.string().min(6).max(30).messages({
    "string.base": "A senha deve ser um texto",
    "string.empty": "A senha não pode estar vazia",
    "string.min": "A senha deve ter no mínimo {#limit} caracteres",
    "string.max": "A senha deve ter no máximo {#limit} caracteres",
  }),
  role: Joi.string().valid("admin", "user").messages({
    "any.only": "O papel deve ser 'admin' ou 'user'",
    "string.base": "O papel deve ser um texto",
  }),
});
 
const userDtoAuth = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "O email deve ser um texto",
    "string.empty": "O email é obrigatório",
    "string.email": "Digite um email válido",
    "any.required": "O email é obrigatório",
  }),
  password: Joi.string().required().messages({
    "string.base": "A senha deve ser um texto",
    "string.empty": "A senha é obrigatória",
    "any.required": "A senha é obrigatória",
  }),
});

export { userDtoAuth, userDtoCreate, userDtoUpdate };
