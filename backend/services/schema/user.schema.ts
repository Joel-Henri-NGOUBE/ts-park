import { model, Model, Schema, models } from "mongoose";
import { User } from "../../models";

const UserSchema = new Schema<User>({
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
        required: true
    },
    role: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    collection: "user",
    timestamps: true
});

export const UserModel: Model<User> =
    models.User || model<User>("User", UserSchema);
