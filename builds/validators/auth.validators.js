"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z
            .string("full_name is required")
            .min(1, "full_name is required")
            .max(100, "full_name can not exceed 100 characters"),
        email: zod_1.z.email("Invalid email").min(1, "email is required"),
        password: zod_1.z
            .string("password must be string")
            .min(6, "minimum 6 characters required"),
    }),
});
