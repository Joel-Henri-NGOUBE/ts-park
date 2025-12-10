type UserRole = "superadmin" | "manager" | "user"
export interface User{
    username: string,
    password: string,
    token: string,
    isActive: boolean,
    role: UserRole,
    score: number // The resulting score of the challenges
}