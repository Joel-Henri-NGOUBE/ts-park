import { Router } from "express";
import { verifyObjectId } from "../fonction";
import { Badge, UserBadge } from "../models";
import { BadgeModel } from "./schema/badge.schema";
import { UserBadgeModel } from "./schema/badgeJoin.schema";
import { UserModel } from "./schema/user.schema";

export class BadgeService {

    public async getAllBadges() {
        try {
            const badges = await BadgeModel.find()
            return badges
        } catch (error) {
            throw new Error("Error while getting all badges");
        }
    }

    public async deleteBadge(id: string) {
        verifyObjectId(id);

        try {
            return await BadgeModel.findByIdAndDelete(id);

        } catch (error) {
            throw new Error("Error while deleting badge");
        }
    }

    public async createBadge(badge: Badge) {
        try {
            const newBadge = new BadgeModel(badge);
            const existingBadge = await BadgeModel.findOne({ name: badge.name });
            if (badge.name === "") {
                throw new Error("Create badge error");
            }

            if (existingBadge) {
                throw new Error("Badge already exists");
            }
            return await newBadge.save();
        } catch (error) {
            throw new Error("Error while creating badge");
        }
    }

    public async assignBadgeToUser(userId: string, badgeId: string) {
        verifyObjectId(badgeId);
        verifyObjectId(userId);
        try {
            const userById = await UserModel.findById(userId)
            const badgeById = await BadgeModel.findById(badgeId)
            if (!userById || !badgeById) {
                throw new Error("User or badge not found");
            }

            const existingBadge = await UserBadgeModel.findOne({ userId, badgeId });
            if (existingBadge) {
                throw new Error("Badge already assigned to user");
            }
            userById.score += badgeById.score;
            await userById.save();
            return await UserBadgeModel.create({ userId, badgeId });

        } catch (error) {
            throw new Error("Error while assigning badge to user");
        }
    }

    public async getUserBadges(userId: string) {
        verifyObjectId(userId);
        try {
            const userById = await UserModel.findById(userId)
            if (!userById) {
                throw new Error("User not found");
            }
            const allBadgeByUser: string[] = [];
            const badges: UserBadge[] = await UserBadgeModel.find({ userId });
            const badgeIds = badges.map(badge => badge.badgeId);

            for (const id of badgeIds) {
                const badge = await BadgeModel.findById(id);
                if (badge) {
                    allBadgeByUser.push(badge.name);
                }
            }
            return allBadgeByUser;


        } catch (error) {
            throw new Error("Error while getting user badges");
        }
    }



}
