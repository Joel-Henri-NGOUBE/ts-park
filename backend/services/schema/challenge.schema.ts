import mongoose, { model, Model, Schema } from "mongoose";
import { Challenge, ChallengeType } from "../../models";
import { Difficulty } from "../../models"

export function getChallengeSchema(): Schema<Challenge>{
    return new Schema<Challenge>({
        name: {
            type: String,
            required: true,
            unique: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
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

export function getChallengeModel(): Model<Challenge>{
    return model("Challenge", getChallengeSchema())
}