import { Request, Response, Router } from "express";
import { BadgeService } from "../services/badge.services"
import { RoleMiddleware } from "../middlewares/role.middleware";
import { authMiddleware } from "../middlewares/authorization.middleware";

export class BadgeController {
    private badgeService: BadgeService
    constructor(badgeService: BadgeService) {
        this.badgeService = badgeService
    }

    async getAllBadges(req: Request, res: Response) {
        try {
            const badges = await this.badgeService.getAllBadges();
            return res.status(200).json(badges)
        } catch (error) {
            return res.status(500).json({ message: "Error while getting all badges" });
        }
    }

    async deleteBadge(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const badges = await this.badgeService.deleteBadge(id);
            return res.status(200).json({ message: "Badge deleted", badges })
        } catch (error) {
            return res.status(500).json({ message: "Error while deleting badge" });
        }
    }

    async createBadge(req: Request, res: Response) {
        const badge = req.body;
        try {
            const badges = await this.badgeService.createBadge(badge);
            return res.status(200).json({ message: "Badge created", badges })
        } catch (error) {
            return res.status(500).json({ message: "Error while creating badge" });
        }
    }

    async assignBadgeToUser(req: Request, res: Response) {
        const { userId, badgeId } = req.body;
        try {
            const user = await this.badgeService.assignBadgeToUser(userId, badgeId);
            return res.status(200).json({ message: "Badge assigned to user and point has been updated", user })
        } catch (error) {
            return res.status(500).json({ message: "Error while assigning badge to user" });
        }
    }

    async getUserBadges(req: Request, res: Response) {
        const userId = req.params.uid;
        try {
            const allBadge = await this.badgeService.getUserBadges(userId);
            return res.status(200).json({ message: "All badge of user:", allBadge })
        } catch (error) {
            return res.status(500).json({ message: "Error while try to recup badge" });
        }
    }


    buildRouter(): Router {
        const router = Router();
        router.get('/', this.getAllBadges.bind(this));
        router.delete('/:id', authMiddleware, RoleMiddleware.denyIfNotSuperAdminOrManager, this.deleteBadge.bind(this));
        router.post('/', authMiddleware, RoleMiddleware.denyIfNotSuperAdminOrManager, this.createBadge.bind(this));
        router.post('/assign', authMiddleware, RoleMiddleware.denyIfNotSuperAdminOrManager, this.assignBadgeToUser.bind(this));
        router.get('/:uid/assign', this.getUserBadges.bind(this));
        return router;
    }

}
