import { Request, Response, Router } from "express";
import { ExerciseModel } from "./schema/exercices.schema";


export class ExerciseService {



    public async getAllExercises() {
        try {
            console.log("Getting all exercises")
            const exercises = await ExerciseModel.find()
            return exercises
        } catch (error) {
            console.error("Error while getting all exercises", error)
            return [];
        }
    }

    public async deleteExercise(req: Request, res: Response) {
        const uid = req.params.uid;
        try {
            if (uid === "") {
                throw new Error("uid is empty");
            }
            const existingExercise = await ExerciseModel.findOne({ uid: uid });
            if (!existingExercise) {
                return res.status(404).json({ message: "Exercise not found" });
            }
            console.log("Deleting exercise")
            return await ExerciseModel.deleteOne({ uid: uid })

        } catch (error) {
            console.error("Error while deleting exercise", error)
        }
    }

    buildRouter(): Router {
        const router = Router();
        router.get('/exercises', this.getAllExercises.bind(this));
        router.delete('/exercises/:uid', this.deleteExercise.bind(this));
        return router;
    }

}

