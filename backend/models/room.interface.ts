import { Types } from "mongoose";

export type Difficulty = "Easy" | "Medium" | "Hard";
export interface Room {
    _id: Types.ObjectId,
    name: string,
    ownerUserId: string,
    capacity: number,
    difficulty?: Difficulty,
    address: string,
    contact: string | number,
    equipment: string,
    roomStatus: "Pending" | "Accepted" | "Refused"
}