import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  fullname: z
    .string()
    .min(1, { message: "Username should be atleast 1 character" })
    .max(50, { message: "Username should be less than 50 characters" }),
  password: z
    .string()
    .min(6, { message: "Password should be atleast 6 characters" })
    .max(32, { message: "Password should be less than 32 characters" }),
  profile_photo: z.string().url().nonempty(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password should be atleast 6 characters" })
    .max(32, { message: "Password should be less than 32 characters" }),
});

export const EditProfileSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  fullname: z
    .string()
    .min(1, { message: "Username should be atleast 1 character" })
    .max(50, { message: "Username should be less than 50 characters" }),
  profile_photo: z.string().url().nonempty(),
});

export const inventorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "Inventory name should be atleast 3 characters." })
    .max(50, { message: "Inventory name should be less than 50 characters." }),
  color: z.string().nonempty(),
});

export const addMemberSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  role: z.enum(["USER", "ADMIN", "OWNER"]),
});
