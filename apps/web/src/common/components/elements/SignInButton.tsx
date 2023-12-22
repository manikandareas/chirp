"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"

function SignInButton () {
    const {data: session} = useSession()

    if (session && session.user)
    {
        return (
            <div style={{display: "flex", gap: "8px"}}>
                <p style={{color: "lightblue"}}>{session?.user.name} | NAME</p>
                <Link href={'api/auth/signout'}>Sign Out</Link>
            </div>
        )
    }

    return (
        <Link href={'api/auth/signin'}>Sign In</Link>
    )
}

export default SignInButton