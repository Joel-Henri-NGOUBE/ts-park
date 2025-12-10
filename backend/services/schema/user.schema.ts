import { model, Model, Schema } from "mongoose";
import { User } from "../../models";

export function getUserSchema(): Schema<User>{
    return new Schema<User>({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String
        },
        isActive: {
            type: Boolean,
            required: true,
            unique: true
        },
        role: {
            type: String,
            required: true,
        }
    }, {
        versionKey: false,
        collection: "user",
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    })
}

export function getUserModel(): Model<User>{
    return model("User", getUserSchema())
}