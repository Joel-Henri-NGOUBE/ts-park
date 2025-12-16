import { Request, Response, Router } from "express";
import { ExerciseModel } from "./schema/exercices.schema";


export class ExerciseService {



    public async getAllExercises(req: Request, res: Response) {
        try {
            const exercises = await ExerciseModel.find()
            return exercises
        } catch (error) {
            console.error("Error while getting all exercises", error)
            return res.status(500).json({ message: "Error while getting all exercises" });
        }
    }

    public async deleteExercise(req: Request, res: Response) {
        const uid = req.params.uid;
        try {
            if (uid === "") {
                return res.status(404).json({ message: "Exercise not found" });
            }
            const existingExercise = await ExerciseModel.findOne({ uid: uid });
            if (!existingExercise) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            console.log("Deleting exercise")
            return await ExerciseModel.deleteOne({ uid: uid })

        } catch (error) {
            return res.status(500).json({ message: "Error while deleting exercise" });
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
        const uid = req.params.uid;
        const exercise = req.body;
        if (uid === "") {
            return res.status(404).json({ message: "Uid is required to found " });
        }
        try {
            const existingExercise = await ExerciseModel.findOne({ uid: uid });
            if (!existingExercise) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            return await ExerciseModel.updateOne({ uid: uid }, exercise);
        } catch (error) {
            return res.status(500).json({ message: "Error while updating exercise" });
        }
    }

    buildRouter(): Router {
        const router = Router();
        router.get('/exercises', this.getAllExercises.bind(this));
        router.delete('/exercises/:uid', this.deleteExercise.bind(this));
        router.post('/exercises', this.createExercise.bind(this));
        router.put('/exercises/:uid', this.updateExercise.bind(this));
        return router;
    }

}

