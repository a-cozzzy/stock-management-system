import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";

// const credentialsConfig = CredentialsProvider({
//     name: 'Credentials',
//     credentials:{
//         name:{
//             label:"User Name",
//         },
//         email:{
//             label:"Email",
//             type:"email",
//         },
//         password:{
//             label:"Password",
//             type:"password",
//         },
//     },  
//     async authorize(credentials:any) {
//         const {name,email,password,isLogin} = credentials;
//         console.log("Credentials received:", credentials);
//         const user = await db.user.findUnique({
//             where:{email},
//         });

//         if(isLogin === "false" && !user){
//             const result = await db.user.create({
//                 data:{name,email,password},
//             });
//             if (result) return result;
//             return null;
//         }else if(user && user.password===password) {
//             return user;
//         }else return null;
//     },
    
// });

const credentialsConfig = CredentialsProvider({
    name: 'Credentials',
    credentials: {
        name: { label: "User Name" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
    },
    async authorize(credentials: any) {
        const { name, email, password, isLogin } = credentials;
        console.log("Credentials received:", credentials); // Log the received credentials

        try {
            const user = await db.user.findUnique({ where: { email } });

            if (isLogin === "false" && !user) {
                // Create new user without hashing the password
                const result = await db.user.create({
                    data: { name, email, password }, 
                });
                return result || null;
            } else if (user && user.password === password) {
                return user;
            } else {
                console.log("Invalid credentials for user:", email);
                return null;
            }
        } catch (error) {
            console.error("Error in authorize method:", error);
            return null;
        }
    },
});


const config={
    providers:[Google,credentialsConfig]
}satisfies NextAuthConfig;

export const {handlers,auth,signIn,signOut} = NextAuth(config);