const { z } = require('zod');

const registerSchema = z.object({
    username: z.string()
        .min(1, "Username is required")
        .min(2, "Username must be at least 2 characters"),
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string()
        .min(1, "Confirm Password is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

module.exports = {
    registerSchema,
}