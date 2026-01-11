"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

export async function signUp(username: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await db.insert(users).values({
            username,
            passwordHash: hashedPassword,
        });
        return {success: true};
    } catch (error) {
        return {
            success: false,
            error: "Username already exists"
        };
    }
}