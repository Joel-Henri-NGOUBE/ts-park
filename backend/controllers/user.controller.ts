import { Request, Response, Router } from "express";
import { UserService } from "../services";


export class UserController {
    private userService: UserService
    constructor(userService: UserService) {
        this.userService = userService
    }
    async getAllUsers(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    buildRouter(): Router {
        const router = Router();
        router.get('/', this.getAllUsers.bind(this));
        return router;
    }

}

