import Joi from "joi";

const interactionDtoCreate = Joi.object({
  descricao: Joi.string().required().message({
    "string.base": "A descrição deve ser um texto",
    "string.empty": "A descrição é obrigatória",
    "any.required": "A descrição é obrigatória",
  }),
  data: Joi.date().required().message({
    "date.base": "A data deve ser uma data válida",
    "date.empty": "A data é obrigatória",
    "any.required": "A data é obrigatória",
  }),
});

const interactionDtoUpdate = Joi.object({
  descricao: Joi.string().message({
    "string.base": "A descrição deve ser um texto",
    "string.empty": "A descrição é obrigatória",
    "any.required": "A descrição é obrigatória",
  }),
  data: Joi.date().message({
    "date.base": "A data deve ser uma data válida",
    "date.empty": "A data é obrigatória",
    "any.required": "A data é obrigatória",
  }),
});

export { interactionDtoCreate, interactionDtoUpdate };