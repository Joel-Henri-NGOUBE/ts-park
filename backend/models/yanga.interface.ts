import { Types } from "mongoose";

export interface Yanga {
    _id: Types.ObjectId;
    nameMachine: string;
    flavor: string[];
    max_litres: number;
    current_litres: number;
    room_id: Types.ObjectId;
}