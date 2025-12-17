import mongoose from "mongoose";

/**
 * To know if the challenge is registered
 */
export interface ChallengeRegistration{
    userId: mongoose.Types.ObjectId,
    challengeId: mongoose.Types.ObjectId
}