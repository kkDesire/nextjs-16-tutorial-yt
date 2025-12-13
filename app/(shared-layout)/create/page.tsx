"use client"

import { blogSchema } from '@/app/schemas/blog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

export default function CreateRoute() {
    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: '',
            content: '',
        }
    })

    function onSubmit(data: z.infer<typeof blogSchema>) {
        startTransition(async () => {
            console.log(data)
            // await blogClient.create({
            //     data,
            //     fetchOptions: {
            //         onSuccess: () => {
            //             toast.success("Blog created successfully")
            //             router.push("/")
            //         },
            //         onError: (error) => {
            //             toast.error(error.error.message)
            //         }
            //     }
            // })
        })
    }


    return (
        <div className='py-12'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>Create Post</h1>
                <p className='text-xl leading-8 text-muted-foreground pt-4'>Share your thoughts with the big world</p>
            </div>
            <Card className='w-full max-w-xl mx-auto'>
                <CardHeader>
                    <CardTitle>Create Blog Article</CardTitle>
                    <CardDescription>Create a new article</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className='gap-y-4'>
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Title</FieldLabel>
                                        <Input
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                            placeholder="Supper cool title"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="content"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Content</FieldLabel>
                                        <Textarea
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                            placeholder="Super cool blog content"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={isPending}
                            >
                                {
                                    isPending ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>Loading...</span>
                                        </>
                                    )
                                        : <span>Create</span>
                                }

                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}