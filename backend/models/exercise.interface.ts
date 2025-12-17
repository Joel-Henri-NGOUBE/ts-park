import { Types } from "mongoose";
import { Difficulty } from "./room.interface";

export interface Exercise {
    _id: Types.ObjectId,
    name: string,
    description: string,
    muscle: string,
    difficulty: Difficulty,
    calories: number,
    duration: number,
    score: number // The score given by the exercice
}