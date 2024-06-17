import Joi from "joi";

export const TourSchema = Joi.object(
    {
        tourname:Joi.string().required(),
        tdestination:Joi.string().required(),
        tdescription:Joi.string().required(),
        tprice:Joi.number().required()
    }
)