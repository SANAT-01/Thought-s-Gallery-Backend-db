import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().pattern(/^[a-zA-Z0-9 ]+$/).min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};

export default validateUser;