import z from "zod";

export const userformschema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    age: z.number().min(18, { message: 'You must be at least 18 years old' }),
    password: z.string().min(6, 'Password must be at least 6 characters long').regex(/[A-Z]/, 'Password must contain at least one uppercase letter').regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 characters long' }),
    gender: z.enum(['male', 'female', 'other'],{
        errorMap: () => ({
            message: 'Gender is required'
        })
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
});


export type UserForm = z.infer<typeof userformschema>
export type UserFormError = Partial<Record<keyof UserForm, string[]>>