import mongoose from "mongoose";

export interface Relations{
    userId1: mongoose.Types.ObjectId,
    userId2: mongoose.Types.ObjectId
}