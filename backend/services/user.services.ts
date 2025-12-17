import { UserModel } from "../services/schema/user.schema";
import { Types } from "mongoose";

export class UserService {

    public async getAllUsers() {
        try {
            const users = await UserModel.find().select("-password -token -role");
            return users
        } catch (error) {
            throw new Error("Error while getting all users");
        }
    }

    public async desactivateUser(id: string) {
        if (!id) throw new Error("Id is required");
        if (!Types.ObjectId.isValid(id)) throw new Error("Invalid id");
        const user = await UserModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true },
        ).select("-password -token -role");
        return user;
    }


    public async activateUser(id: string) {
        if (!id) throw new Error("Id is required");
        if (!Types.ObjectId.isValid(id)) throw new Error("Invalid id");
        const user = await UserModel.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true },
        ).select("-password -token -role");
        return user;
    }
}

