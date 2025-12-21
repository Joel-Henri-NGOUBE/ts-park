import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).end();

    const parts = authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).end();

    const token = parts[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        res.locals.token = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
