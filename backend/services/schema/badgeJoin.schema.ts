import { Model, model, models, Schema } from "mongoose";
import { UserBadge } from "../../models";

const UserBadgeSchema = new Schema<UserBadge>({
    userId: {
        type: String,
        required: true,
    },
    badgeId: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    collection: "UserBadges",
    timestamps: true
});

export const UserBadgeModel: Model<UserBadge> =
    models.UserBadge || model<UserBadge>("UserBadge", UserBadgeSchema);
