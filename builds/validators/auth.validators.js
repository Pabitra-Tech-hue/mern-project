"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutSchema = exports.LoginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
// * Register / Signup
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({
            error: (issue) => issue.input === undefined
                ? "name is required"
                : "name must be a string",
        })
            .min(1, "name is required")
            .max(100, "name can not exceed 100 characters"),
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined
                ? "email is required"
                : "Invalid email",
        }),
        password: zod_1.z
            .string({
            error: (issue) => issue.input === undefined
                ? "password is required"
                : "password must be a string",
        })
            .min(6, "minimum 6 characters required"),
        c_password: zod_1.z
            .string({
            error: (issue) => issue.input === undefined
                ? "confirm password is required"
                : "confirm password must be a string",
        })
            .min(6, "minimum 6 characters required"),
    })
        .refine((data) => data.password === data.c_password, {
        message: "Passwords do not match",
        path: ["c_password"],
    }),
});
// * Login
exports.LoginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined
                ? "email is required"
                : "invalid email",
        }),
        password: zod_1.z.string({
            error: (issue) => issue.input === undefined
                ? "password is required"
                : "password must be a string",
        }),
    }),
});
// * Logout
exports.logoutSchema = zod_1.z.object({
    body: zod_1.z.object({}).optional(),
});
