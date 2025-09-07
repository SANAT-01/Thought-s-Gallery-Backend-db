import Joi from "joi";

const createUserSchema = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9 ]+$/)
        .min(3)
        .max(30)
        .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const updateUserSchema = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9 ]+$/)
        .min(3)
        .max(30)
        .required(),
    profile_picture: Joi.string().uri().optional().allow(null, ""),
    bio: Joi.string().max(160).optional().allow(null, ""),
});

export const validateCreateUser = (req, res, next) => {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }
    next();
};

export const validateLoginUser = (req, res, next) => {
    const { error } = loginUserSchema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }
    next();
};

export const validateUpdateUser = (req, res, next) => {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }
    next();
};
