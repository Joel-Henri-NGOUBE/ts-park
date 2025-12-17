import { Types } from "mongoose";

export interface User {
    _id: Types.ObjectId,
    username: string,
    password: string,
    token: string,
    isActive: boolean,
    role: "superadmin" | "manager" | "user",
    score: number // The resulting score of the challenges
}