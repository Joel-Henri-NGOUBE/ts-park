import mongoose from "mongoose";

export interface RoomUser{
    roomId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
}