import { UserBadgeService } from "../services/userBadge.services";

export class UserBadgeController {
    private userBadgeService: UserBadgeService
    constructor(userBadgeService: UserBadgeService) {
        this.userBadgeService = userBadgeService;
    }

}