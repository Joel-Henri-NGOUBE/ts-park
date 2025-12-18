import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export class RoleMiddleware{
    static denyIfNotSuperAdmin(req: Request, res: Response, next: NextFunction){
        if((res.locals.token as User).role !== "superadmin"){
            res.status(403).end()
        }
    }
    static denyIfNotSuperAdminOrManager(req: Request, res: Response, next: NextFunction){
        if((res.locals.token as User).role !== "superadmin" || (res.locals.token as User).role !== "manager"){
            res.status(403).end()
        }
    }
}