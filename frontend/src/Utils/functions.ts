import { jwtDecode } from "jwt-decode"

export function findIfUserIsSuperAdmin(){
    const token = localStorage.getItem("token")

    const credentials = token ? jwtDecode(token) as {role: ""} : {role: ""}

    const isAdmin = credentials?.role === "superadmin" ? true : false
    
    return isAdmin
}

export function findIfUserIsManager(){
    const token = localStorage.getItem("token")

    const credentials = token ? jwtDecode(token) as {role: ""} : {role: ""}

    const manager = credentials?.role === "manager" ? true : false
    
    return manager
}