"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const validator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                status: "fail",
                success: false,
                data: null,
            });
        }
        next();
    };
};
exports.validator = validator;
