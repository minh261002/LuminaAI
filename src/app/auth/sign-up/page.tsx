"use client";

import { LogoIcon } from '@/components/ui/logo'
import GoogleAuth from '@/components/buttons/oauth/google';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link'

export default function SignUp() {
    const { signUpForm, handleSignUp, isLoading } = useAuth()
    const { register, handleSubmit, formState: { errors } } = signUpForm
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                onSubmit={handleSubmit(handleSignUp)}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="mx-auto block w-fit">
                            <LogoIcon />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to Lumina Ai</h1>
                        <p className="text-sm">Welcome back! Sign in to continue</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="firstname"
                                        className="block text-sm">
                                        Firstname
                                    </Label>
                                    <Input
                                        type="text"
                                        required
                                        {...register("firstName")}
                                        className={errors.firstName ? 'border-destructive' : ''}
                                    />
                                    {errors?.firstName && (
                                        <p className='text-xs text-destructive'>
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="lastname"
                                        className="block text-sm">
                                        Lastname
                                    </Label>
                                    <Input
                                        type="text"
                                        required
                                        {...register("lastName")}
                                        className={errors.lastName ? 'border-destructive' : ''}
                                    />
                                    {errors?.lastName && (
                                        <p className='text-xs text-destructive'>
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="block text-sm">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    className={errors.email ? 'border-destructive' : ''}
                                />
                                {errors?.email && (
                                    <p className='text-xs text-destructive'>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-0.5">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm">
                                        Password
                                    </Label>
                                    <Button
                                        asChild
                                        variant="link"
                                        size="sm">
                                        <Link
                                            href="#"
                                            className="link intent-info variant-ghost text-xs">
                                            Forgot your Password ?
                                        </Link>
                                    </Button>
                                </div>
                                <Input
                                    type="password"
                                    id="password"
                                    className={errors.password ? 'border-destructive' : ''}
                                    {...register("password")}
                                />
                                {errors?.password && (
                                    <p className='text-xs text-destructive'>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {errors.root && (
                                <p className='text-xs text-destructive text-center'>
                                    {errors.root.message}
                                </p>
                            )}

                            <Button className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2Icon className='w-4 h-4 animate-spin' /> : 'Sign Up'}
                            </Button>
                        </div>

                        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                            <hr className="border-dashed" />
                            <span className="text-muted-foreground text-xs">Or continue With</span>
                            <hr className="border-dashed" />
                        </div>

                        <div className="grid grid-cols-1">
                            <GoogleAuth />
                        </div>
                    </div>

                    <div className="p-3">
                        <p className="text-accent-foreground text-center text-sm">
                            Don&apos;t have an account ?
                            <Button
                                asChild
                                variant="link"
                                className="px-2">
                                <Link href="/auth/sign-up">Create account</Link>
                            </Button>
                        </p>
                    </div>
                </div>
            </form>
        </section>
    )
}