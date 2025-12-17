import { Request, Response, Router } from "express";
import { UserService } from "../services";


export class UserController {
    private userService: UserService
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

    buildRouter(): Router {
        const router = Router();
        router.get('/', this.getAllUsers.bind(this));
        router.put('/:id/activate', this.activateUser.bind(this));
        router.put('/:id/desactivate', this.desactivateUser.bind(this));
        return router;
    }

}

