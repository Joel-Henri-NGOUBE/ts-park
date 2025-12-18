import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authorization: string | undefined = req.headers.authorization
    if(!authorization){
        return res.status(401).end()
    }
    const authMembers = authorization?.split(" ") as Array<string>;
    if(authMembers.length !== 2 || authMembers[0] !== "Bearer") {
        return res.status(401).end();
    }
    const token = authMembers[1]
    let jwtErrorOccured = false
    const payload = jwt.verify(token, process.env.JWT_SECRET as string, (error) => {
        if(error){
            jwtErrorOccured = true
        }
    })
    if(jwtErrorOccured){
        return res.status(401).json({"message": "Something went wrong with your session token"})
    }
    res.locals.token = payload
    next()
}