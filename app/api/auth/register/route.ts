import { NextResponse } from "next/server";
import { AuthenticationClient } from "auth0";
import { auth0 } from "@/lib/auth/auth";


export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        console.log({
            name,
            email,
            password
        })
        // VALIDASYON
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Auth0 SDK ile Kayıt (Barebones Test)
        try {
            const response = await auth0.database.signUp({
                email,
                password,
                connection: "Username-Password-Authentication",
            });

            console.log("Auth0 Registration Success:", response.data);

            return NextResponse.json(
                {
                    message: "User registered successfully",
                    user: {
                        email: response.data.email,
                        id: (response.data as any)._id
                    }
                },
                { status: 201 }
            );
        } catch (authError: any) {
            console.error("Auth0 SDK Error Details:", authError);

            // Auth0 hata mesajlarını anlamlı hale getir
            let errorMessage = "Registration failed at Auth0";
            if (authError.statusCode === 409) {
                errorMessage = "Email already exists";
            } else if (authError.message) {
                errorMessage = authError.message;
            }

            return NextResponse.json(
                { message: errorMessage },
                { status: authError.statusCode || 400 }
            );
        }
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
