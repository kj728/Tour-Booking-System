import Joi from "joi";

export const BookingSchema = Joi.object(

    {
        userid: Joi.string().required(),
        tourid: Joi.string().required(),
        hotelid: Joi.string().required(),
        bstartdate: Joi.string().required(),
        benddate: Joi.string().required(),
        bookingdate: Joi.string().required(),
        bguests: Joi.number().required(),
        bstatus: Joi.string().required(),
        bEmailSent: Joi.number().required()

    }
);