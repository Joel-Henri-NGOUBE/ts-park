import { model, Model, Schema, models } from "mongoose";
import { User } from "../../models";
import { Yanga } from "../../models/yanga.interface";

const YangaSchema = new Schema<Yanga>({
    nameMachine: {
        type: String,
        required: true,
        unique: false,
        default: "Machine Yanga"
    },
    flavor: {
        type: [],
        required: true,
        unique: false,
    },
    max_litres: {
        type: Number,
        required: true,
        unique: false,
        default: 0
    },
    current_litres: {
        type: Number,
        required: true,
        unique: false,
        default: 0
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true,
        unique: false
    }
}, {
    versionKey: false,
    collection: "yangaBoisson",
    timestamps: true
});

export const YangaModel: Model<Yanga> =
    models.Yanga || model<Yanga>("Yanga", YangaSchema);
