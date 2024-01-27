"use server";
import { z } from "zod";
import { fetcher } from "./api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ArticleData, UserResponse, UserData } from "./definitions";

export type CommentFormState = {
    status?: string;
};

export async function addComment(
    articleData: ArticleData,
    prevState: CommentFormState,
    formData: FormData
): Promise<CommentFormState> {
    const { id, slug } = articleData;
    const jwt = cookies().get("jwt")?.value;
    const author = cookies().get("username")?.value;
    const text = formData.get("comment");

    try {
        await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                data: {
                    text,
                    author,
                    article: id,
                },
            }),
        });
        revalidatePath(`/blog/${slug}`);
    } catch (error) {
        console.error("error with request", error);
        return {
            status: "error",
        };
    }
    return {
        status: "success",
    };
}

export type RegisterFormState = {
    errors?: {
        email?: string[];
        password?: string[];
        username?: string[];
    };
    data?: UserResponse;
    message?: string | null;
};

const userFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" }),
});

export async function createUser(
    userData: UserData
): Promise<RegisterFormState> {
    const validatedFields = userFormSchema.safeParse({
        email: userData.email,
        password: userData.password,
        username: userData.username,
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create User.",
        };
    }

    const { email, password, username } = validatedFields.data;

    try {
        const responseData = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                }),
            }
        );
        if (responseData.data === null && responseData.error) {
            throw new Error(`Error: ${responseData.error.message}`);
        }

        return {
            data: responseData,
            message: "success",
        };
    } catch (error) {
        console.error("Database Error: Failed to Create User.", error);
        return {
            message: "Database Error: Failed to Create User.",
        };
    }
}
