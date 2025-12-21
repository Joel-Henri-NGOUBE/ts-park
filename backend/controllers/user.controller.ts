import { Request, Response, Router } from "express";
import { UserService } from "../services";
import { getRoomUserModel } from "../services/schema/room_user.schema";
import { getRelationsModel } from "../services/schema/relation.schema";
import jwt from "jsonwebtoken"
import { User } from "../models";
import mongoose from "mongoose";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { authMiddleware } from "../middlewares/authorization.middleware";

export class UserController {
    private userService: UserService
    private roomUserModel = getRoomUserModel()
    private relationsModel = getRelationsModel()
    constructor(userService: UserService) {
        this.userService = userService
    }
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ message: "Error while getting all users" });
        }
    }

    async desactivateUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await this.userService.desactivateUser(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ message: "User desactivated successfully", user });

        } catch (error: any) {
            return res.status(400).json({ message: "Error while desactivating user:   ", error });
        }
    }

    async activateUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await this.userService.activateUser(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ message: "User activated successfully", user });

        } catch (error: any) {
            return res.status(400).json({ message: "Error while activating user:   ", error });
        }
    }

    private getPayload(req: Request) {
        const token = req.headers?.authorization?.split(" ")[1]
        const payload = jwt.verify(token as string, process.env.JWT_SECRET as string)

        return { token, payload }
    }

    public async joinRoom(req: Request, res: Response) {
        const id = req.params.id
        const { token, payload } = this.getPayload(req)
        this.roomUserModel.insertOne({
            userId: new mongoose.Types.ObjectId((payload as User)._id),
            roomId: new mongoose.Types.ObjectId(id)
        })
    }

    public async makeRelation(req: Request, res: Response) {
        const id = req.params.id
        const { token, payload } = this.getPayload(req)
        this.relationsModel.insertOne({
            user1Id: new mongoose.Types.ObjectId((payload as User)._id),
            user2Id: new mongoose.Types.ObjectId(id)
        })
    }

    buildRouter(): Router {
        const router = Router();
        router.get('/', this.getAllUsers.bind(this));
        router.get('/join_room/:id', this.joinRoom.bind(this));
        router.get('/relate/:id', this.joinRoom.bind(this));
        router.put('/:id/activate', authMiddleware, RoleMiddleware.denyIfNotSuperAdmin, this.activateUser.bind(this));
        router.put('/:id/desactivate', authMiddleware, RoleMiddleware.denyIfNotSuperAdmin, this.desactivateUser.bind(this));
        return router;
    }

}

