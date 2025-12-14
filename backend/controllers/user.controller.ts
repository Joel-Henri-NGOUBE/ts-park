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

    async desactivateUser(req: Request, res: Response) {
        const user = await this.userService.desactivateUser(req, res);
        res.json(user);
    }

    async activateUser(req: Request, res: Response) {
        const user = await this.userService.activateUser(req, res);
        res.json(user);
    }

    buildRouter(): Router {
        const router = Router();
        router.get('/', this.getAllUsers.bind(this));
        router.put('/:id/activate', this.activateUser.bind(this));
        router.put('/:id/desactivate', this.desactivateUser.bind(this));
        return router;
    }

}

