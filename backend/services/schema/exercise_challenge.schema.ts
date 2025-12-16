import mongoose, { model, Model, Schema } from "mongoose";
import { ExerciseChallenge } from "../../models";
import { Difficulty } from "../../models"

export function getExerciseChallengeSchema(): Schema<ExerciseChallenge>{
    return new Schema<ExerciseChallenge>({
        order: {
            type: Number,
            required: true,
        },
        challengeId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        exerciseId: {
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

export function getExerciseChallengeModel(): Model<ExerciseChallenge>{
    return model("ExerciseChallenge", getExerciseChallengeSchema())
}