
export interface User {
    uid: string,
    username: string,
    password: string,
    token: string,
    isActive: boolean,
    role: "superadmin" | "manager" | "user",
    score: number // The resulting score of the challenges
}