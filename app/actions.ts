"use server"

import { postSchema } from "./schemas/blog"
import { z } from "zod"
import { fetchMutation } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { redirect } from "next/navigation"
import { getToken } from "@/lib/auth-server"

export async function createBlogAction(values: z.infer<typeof postSchema>) {
    const passed = postSchema.safeParse(values)
    if (!passed.success) {
        throw new Error("Something went wrong")
    }

    const token = await getToken()

    await fetchMutation(api.posts.createPost, {
        title: passed.data.title,
        body: passed.data.content,
    }, {
        token
    })

    return redirect("/")
}