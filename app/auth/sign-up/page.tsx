"use client"

import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input {...field} placeholder="John Doe" />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input {...field} placeholder="john@doe.com" />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input {...field} placeholder="********" type="password" />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        <Button type="submit">Sign Up</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}