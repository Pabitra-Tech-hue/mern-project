import {z} from 'zod'

export const registerUserSchema  =z.object({
    body: z.object({
        full_name:z.string({
            error:(issue)=>
                issue.input===undefined
                ? "full_name is required"
                :"full_name must be string",
        })
            .min(1,"full_name is required")
            .max(100,"full_name can not exceed 100 characters"),
        
    email: z.email({
            error:(issue)=>
                issue.input===undefined
                ? "email is required"
                :"Invalid email",
        }).min(1,"email is required"),
    password: z.string({
            error:(issue)=>
                issue.input===undefined
                ? "fpassword is required"
                :"password must be string",
        })
    .min(6,"minimum 6 character required"),

}),
    });

    //login schema
    //email, passwrod
export const loginUserSchema=z.object({
    body:z.object({
        email:z.email("email invalid").min(1,"email is required"),
        password:z.string().min(1,"password is required")
    }),
});