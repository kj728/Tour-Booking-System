import Joi from "joi";


export const RegisterSchema = Joi.object(
    {
        username: Joi.string().required(),
        uemail: Joi.string().required().email(),
        upassword: Joi.string().required()
            .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
    }
)