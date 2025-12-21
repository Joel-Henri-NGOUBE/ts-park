import mongoose, { model, Model, models, Schema } from "mongoose";
import { Challenge, ChallengeType } from "../../models";
import { Difficulty } from "../../models"

export function getChallengeSchema(): Schema<Challenge> {
    return new Schema<Challenge>({
        name: {
            type: String,
            required: true,
            unique: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
        },
        roomId: {
            type: mongoose.Types.ObjectId,
        },
        shared: {
            type: Boolean
        },
        type: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        }
    }, {
        versionKey: false,
        collection: "challenge",
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    })
}

export const ChallengeModel: Model<Challenge> =
    models.Challenge || model<Challenge>("Challenge", getChallengeSchema());