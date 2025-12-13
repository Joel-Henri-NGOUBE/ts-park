import { Router } from "express";
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

    buildRouter(): Router {
        const router = Router();
        router.get('/users', this.getAllUsers.bind(this));
        return router;
    }

}

