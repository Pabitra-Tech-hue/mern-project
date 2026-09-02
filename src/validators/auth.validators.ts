import { z } from "zod";

// * Register / Signup
export const registerUserSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? "name is required"
              : "name must be a string",
        })
        .min(1, "name is required")
        .max(100, "name can not exceed 100 characters"),

      email: z.email({
        error: (issue) =>
          issue.input === undefined
            ? "email is required"
            : "Invalid email",
      }),

      password: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? "password is required"
              : "password must be a string",
        })
        .min(6, "minimum 6 characters required"),

      c_password: z
        .string({
          error: (issue) =>
            issue.input === undefined
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
export const LoginUserSchema = z.object({
  body: z.object({
    email: z.email({
      error: (issue) =>
        issue.input === undefined
          ? "email is required"
          : "invalid email",
    }),

    password: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "password is required"
          : "password must be a string",
    }),
  }),
});

// * Logout
export const logoutSchema = z.object({
  body: z.object({}).optional(),
});