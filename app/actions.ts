"use server"

import { postSchema } from "./schemas/blog"
import { z } from "zod"
import { fetchMutation } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { redirect } from "next/navigation"
import { getToken } from "@/lib/auth-server"

export async function createBlogAction(values: z.infer<typeof postSchema>) {
    try {
        const passed = postSchema.safeParse(values)
        if (!passed.success) {
            throw new Error("Something went wrong")
        }

        const token = await getToken()

        const imageUrl = await fetchMutation(api.posts.generateImageUploadUrl, {}, {
            token
        })

        const uploadResult = await fetch(imageUrl, {
            method: "POST",
            headers: {
                "Content-Type": passed.data.image.type,
            },
            body: passed.data.image,
        })

        if (!uploadResult.ok) {
            return {
                error: "Failed to upload image"
            }
        }

        const { storageId } = await uploadResult.json()
        await fetchMutation(api.posts.createPost, {
            title: passed.data.title,
            body: passed.data.content,
            imageStorageId: storageId,
        }, {
            token
        })

        return redirect("/")


    } catch (error) {
        return {
            error: "Failed to create post"
        }
    }



}