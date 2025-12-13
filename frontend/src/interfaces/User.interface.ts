
export interface User {
    username: string,
    password: string,
    token: string,
    isActive: boolean,
    role: "superadmin" | "manager" | "user",
    score: number // The resulting score of the challenges
}