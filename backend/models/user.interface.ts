import mongoose from "mongoose"

type UserRole = "superadmin" | "manager" | "user"
export interface User{
    _id: mongoose.Types.ObjectId
    username: string,
    password: string,
    token: string,
    isActive: boolean,
    role: UserRole,
    score: number // The resulting score of the challenges
}