import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    full_name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "full_name is required"
            : "full_name must be a string",
      })
      .min(1, "full_name is required")
      .max(100, "full_name can not exceed 100 characters"),
    email: z.email({
      error: (issue) =>
        issue.input === undefined ? "email is required" : "Invalid email",
    }),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "password is required"
            : "password must be a string",
      })
      .min(6, "minimum 6 characters required"),
  }),
});
// *login
export const LoginUserSchema = z.object({
  body: z.object({
    email: z.email({
      error: (issue) =>
        issue.input === undefined ? "email is required" : "invalid email",
    }),
    password: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "password is required"
          : "password must be a string",
    }),
  }),
});

// *logout
export const logoutSchema = z.object({
  body: z.object({}).optional(),
});