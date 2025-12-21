import { Model, model, models, Schema, Types } from "mongoose";
import { YangaToRefill } from "../../models";

export const YangaToRefillSchema = new Schema<YangaToRefill>({
    yangaId: {
        type: Types.ObjectId,
        ref: "Yanga",
        required: true
    },
    roomId: {
        type: Types.ObjectId,
        ref: "Room",
        required: true
    }


}, {
    versionKey: false,
    collection: "yangaToRefill",
    timestamps: true
});

export const YangaToRefillModel: Model<YangaToRefill> =
    models.YangaToRefill || model<YangaToRefill>("YangaToRefill", YangaToRefillSchema);