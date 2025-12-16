import mongoose from "mongoose"
import { Difficulty } from "./room.interface"

export type ChallengeType = "room" | "user" | "social"

export interface Challenge{
    name: string,
    userId?: mongoose.Types.ObjectId,
    type: ChallengeType,
    difficulty?: Difficulty
}