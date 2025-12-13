import { model, Model, Schema, models } from "mongoose";
import { Exercise } from "../../models";

const ExerciseSchema = new Schema<Exercise>({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    muscle: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true
    },

}, {
    versionKey: false,
    collection: "exercices",
    timestamps: true
});

export const ExerciseModel: Model<Exercise> =
    models.Exercise || model<Exercise>("Exercise", ExerciseSchema);
