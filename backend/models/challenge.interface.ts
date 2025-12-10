import { Difficulty } from "./room.interface"

type ChallengeType = "room" | "user" | "social"
export interface Challenge{
    name: string,
    userId?: string,
    type: ChallengeType,
    difficulty?: Difficulty
}