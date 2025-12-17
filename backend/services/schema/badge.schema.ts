import { Model, model, models, Schema } from "mongoose";
import { Badge } from "../../models";

const BadgeSchema = new Schema<Badge>({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false,
    collection: "badges",
    timestamps: true
});

export const BadgeModel: Model<Badge> =
    models.Badge || model<Badge>("Badge", BadgeSchema);
