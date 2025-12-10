type UserRole = "superadmin" | "manager" | "user"
export interface User{
    username: string,
    mail: string,
    password: string,
    token: string,
    isActive: boolean,
    role: UserRole,
    score: number // The resulting score of the challenges
}