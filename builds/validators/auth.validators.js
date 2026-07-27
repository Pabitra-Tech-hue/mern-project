"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutSchema = exports.LoginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z
            .string({
            error: (issue) => issue.input === undefined
                ? "full_name is required"
                : "full_name must be a string",
        })
            .min(1, "full_name is required")
            .max(100, "full_name can not exceed 100 characters"),
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined ? "email is required" : "Invalid email",
        }),
        password: zod_1.z
            .string({
            error: (issue) => issue.input === undefined
                ? "password is required"
                : "password must be a string",
        })
            .min(6, "minimum 6 characters required"),
    }),
});
// *login
exports.LoginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined ? "email is required" : "invalid email",
        }),
        password: zod_1.z.string({
            error: (issue) => issue.input === undefined
                ? "password is required"
                : "password must be a string",
        }),
    }),
});
// *logout
exports.logoutSchema = zod_1.z.object({
    body: zod_1.z.object({}).optional(),
});
