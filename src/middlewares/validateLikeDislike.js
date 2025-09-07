import Joi from "joi";

const postLikeSchema = Joi.object({
    userId: Joi.string().uuid().required(),
});

const postDislikeSchema = Joi.object({
    userId: Joi.string().uuid().required(),
});

export const validatePostDislike = (req, res, next) => {
    const { error } = postDislikeSchema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }
    next();
};

export const validatePostLike = (req, res, next) => {
    const { error } = postLikeSchema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }
    next();
};
