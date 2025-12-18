import mongoose from "mongoose";

export interface Relations{
    user1Id: mongoose.Types.ObjectId,
    user2Id: mongoose.Types.ObjectId
}