import mongoose, { model, Model, Schema } from "mongoose";
import { ChallengeRegistration, ExerciseChallenge } from "../../models";
import { Difficulty } from "../../models"

export function getChallengeRegistrationSchema(): Schema<ChallengeRegistration>{
    return new Schema<ChallengeRegistration>({
        challengeId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
    }, {
        versionKey: false,
        collection: "challenge",
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    })
}

export function getChallengeRegistrationModel(): Model<ChallengeRegistration>{
    return model("ChallengeRegistration", getChallengeRegistrationSchema())
}