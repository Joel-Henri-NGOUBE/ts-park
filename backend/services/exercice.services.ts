import { Request, Response, Router } from "express";
import { ExerciseModel } from "./schema/exercices.schema";
import { verifyObjectId } from "../fonction";


export class ExerciseService {

    public async getAllExercises() {
        try {
            const exercises = await ExerciseModel.find()
            return exercises
        } catch (error) {
            throw new Error("Error while getting all users");
        }
    }

    public async deleteExercise(id: string) {
        verifyObjectId(id);
        try {
            return await ExerciseModel.findByIdAndDelete(id);

        } catch (error) {
            throw new Error("Error while deleting exercise");
        }
    }

    public async createExercise(req: Request, res: Response) {
        const exercise = req.body;
        try {
            const newExercise = new ExerciseModel(exercise);
            const existingExercise = await ExerciseModel.findOne({ name: newExercise.name });
            if (newExercise.name === "") {
                return res.status(400).json({ message: "Exercise name is required" });
            }

            if (existingExercise) {
                return res.status(409).json({ message: "Exercise already exists" });
            }
            return await newExercise.save();
        } catch (error) {
            return res.status(500).json({ message: "Error while creating exercise" });
        }
    }

    public async updateExercise(req: Request, res: Response) {
        const id = req.params.id;
        const exercise = req.body;
        if (id === "") {
            return res.status(404).json({ message: "Id is required to found " });
        }
        try {
            const existingExercise = await ExerciseModel.findOne({ id: id });
            if (!existingExercise) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            return await ExerciseModel.updateOne({ id: id }, exercise);
        } catch (error) {
            return res.status(500).json({ message: "Error while updating exercise" });
        }
    }


}

