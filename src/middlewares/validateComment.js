import Joi from "joi";

const postCommentSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    content: Joi.string().min(1).max(500).required(),
});

export const validatePostComment = (req, res, next) => {
    const { error } = postCommentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};