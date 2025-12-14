import { Request, Response, Router } from "express";
import { UserModel } from "../services/schema/user.schema";


export class UserService {



    public async getAllUsers() {
        try {
            console.log("Getting all users")
            const users = await UserModel.find()
            return users
        } catch (error) {
            console.error("Error while getting all users", error)
            return [];
        }
    }

    public async desactivateUser(req: Request, res: Response) {
        const uid = req.params.id;
        if (uid === "") {
            return res.status(404).json({ message: "Uid is required to found " });
        }
        try {
            const existingUser = await UserModel.findOne({ uid: uid });
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return await UserModel.updateOne({ uid: uid }, { isActive: false });
        } catch (error) {
            return res.status(500).json({ message: "Error while updating user" });
        }
    }

    public async activateUser(req: Request, res: Response) {
        const uid = req.params.id;
        if (uid === "") {
            return res.status(404).json({ message: "Uid is required to found " });
        }
        try {
            const existingUser = await UserModel.findOne({ uid: uid });
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return await UserModel.updateOne({ uid: uid }, { isActive: true });
        } catch (error) {
            return res.status(500).json({ message: "Error while updating user" });
        }
    }

    buildRouter(): Router {
        const router = Router();
        router.get('/users', this.getAllUsers.bind(this));
        router.put('/users/:id', this.desactivateUser.bind(this));
        router.put('/users/:id', this.activateUser.bind(this));
        return router;
    }

}

