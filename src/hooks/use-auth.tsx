import { useAuthActions } from "@convex-dev/auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
})

const signUpSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
})

type SignInData = z.infer<typeof signInSchema>
type SignUpData = z.infer<typeof signUpSchema>

export const useAuth = () => {
    const { signIn, signOut } = useAuthActions()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const signInForm = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const signUpForm = useForm<SignUpData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    })

    const handleSignIn = async (data: SignInData) => {
        setIsLoading(true)
        try {
            await signIn('password', {
                email: data.email,
                password: data.password,
                flow: "signIn"
            })
            router.push('/dashboard')
        } catch (error) {
            console.error(error);
            signInForm.setError('root', {
                message: "Invalid email or password"
            })
        } finally {
            setIsLoading(false)
        }
    }


    const handleSignUp = async (data: SignUpData) => {
        setIsLoading(true)
        try {
            await signIn('password', {
                email: data.email,
                password: data.password,
                name: `${data.firstName} ${data.lastName}`,
                flow: "signUp"
            })
            router.push('/dashboard')
        } catch (error) {
            console.error(error);
            signUpForm.setError('password', {
                message: "Invalid email or password"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return {
        signInForm,
        signUpForm,
        handleSignIn,
        handleSignUp,
        isLoading
    }
}