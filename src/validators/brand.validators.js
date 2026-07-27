import { z } from "zod";


// Create brand validation
export const createBrandSchema = z.object({
  body: z.object({

    name: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "brand name is required"
          : "brand name must be string",
    })
    .min(2, "brand name must be at least 2 characters")
    .max(100, "brand name cannot exceed 100 characters"),


    description: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "description is required"
          : "description must be string",
    })
    .min(5, "description must be at least 5 characters"),


    logo: z.string()
      .optional(),

  }),
});


// Update brand validation
export const updateBrandSchema = z.object({
  body: z.object({

    name: z.string()
      .min(2, "brand name must be at least 2 characters")
      .optional(),


    description: z.string()
      .min(5, "description must be at least 5 characters")
      .optional(),


    logo: z.string()
      .optional(),

  }),

  params: z.object({
    id: z.string({
      error: "brand id is required",
    }),
  }),
});
      

    