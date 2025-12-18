import mongoose from "mongoose"
import { Difficulty } from "./room.interface"

export type ChallengeType = "room" | "user" | "social"

export interface Challenge{
    _id: mongoose.Types.ObjectId
    name: string,
    userId?: mongoose.Types.ObjectId,
    shared?: boolean,
    roomId?: mongoose.Types.ObjectId
    type: ChallengeType,
    difficulty?: Difficulty
}