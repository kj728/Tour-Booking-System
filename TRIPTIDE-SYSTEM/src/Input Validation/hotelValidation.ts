import Joi from "joi";

export const HotelSchema=Joi.object(
    {
        hotelname: Joi.string().required(),
        hotellocation: Joi.string().required(),
        hotelrating: Joi.number().required()
    }
)