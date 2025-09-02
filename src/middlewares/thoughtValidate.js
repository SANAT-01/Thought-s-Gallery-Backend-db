import Joi from "joi";

const thoughtSchema = Joi.object({
    user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    content: Joi.string().min(1).max(500).required()
});

const validateThought = (req, res, next) => {
    const { error } = thoughtSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};

export default validateThought;