import { Types } from "mongoose";

export function verifyObjectId(id: string) {
    if (!id) throw new Error("Id is required");
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid id");

}