import mongoose, { model, Model, Schema } from "mongoose";
import { Relations } from "../../models";

export function getRelationsSchema(): Schema<Relations>{
    return new Schema<Relations>({
        user1Id: {
            required: true,
            type: mongoose.Types.ObjectId,
        },
        user2Id: {
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

export function getRelationsModel(): Model<Relations>{
    return model("Relations", getRelationsSchema())
}