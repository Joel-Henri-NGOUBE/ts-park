import mongoose, { model, Model, Schema } from "mongoose";
import { RoomUser } from "../../models/room_user";

export function getRoomUserSchema(): Schema<RoomUser>{
    return new Schema<RoomUser>({
        userId: {
            required: true,
            type: mongoose.Types.ObjectId,
        },
        roomId: {
            required: true,
            type: mongoose.Types.ObjectId,
        }
    }, {
        versionKey: false,
        collection: "challenge",
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    })
}

export function getRoomUserModel(): Model<RoomUser>{
    return model("RoomUser", getRoomUserSchema())
}