import mongoose from "mongoose";

/**
 * To know which exercise has been done by which user for the challenge
 */
export interface ExerciseChallenge{
    order: number,
    challengeId: mongoose.Types.ObjectId,
    exerciseId: mongoose.Types.ObjectId,
}