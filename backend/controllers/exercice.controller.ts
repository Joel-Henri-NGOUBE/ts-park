import { Request, Response, Router } from "express"
import { ExerciseService } from "../services/exercice.services";
export class ExerciseController {
    private exerciseService: ExerciseService
    constructor(exerciseService: ExerciseService) {
        this.exerciseService = exerciseService
    }
    async getAllExercises(req: Request, res: Response) {
        const exercises = await this.exerciseService.getAllExercises();
        res.json(exercises);
    }

    async deleteExercise(req: Request, res: Response) {
        const exercises = await this.exerciseService.deleteExercise(req, res);
        res.json(exercises);
    }

    buildRouter(): Router {
        const router = Router();
        router.get('/', this.getAllExercises.bind(this));
        router.delete('/:uid', this.deleteExercise.bind(this));
        return router;
    }

}