import { Model, model, models, Schema } from "mongoose";
import { Room } from "../../models";

const RoomSchema = new Schema<Room>({
    name: {
        type: String,
        required: true,
    },
    ownerUserId: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    equipment: {
        type: String,
        required: true,
    },
    roomStatus: {
        type: String,
        required: true,
        default: "Pending"
    }
}, {
    versionKey: false,
    collection: "rooms",
    timestamps: true
});

export const RoomModel: Model<Room> =
    models.Room || model<Room>("Room", RoomSchema);
