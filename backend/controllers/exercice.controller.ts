import { Request, Response, Router } from "express"
import { ExerciseService } from "../services/exercice.services";
export class ExerciseController {
    private exerciseService: ExerciseService
    constructor(exerciseService: ExerciseService) {
        this.exerciseService = exerciseService
    }
    async getAllExercises(req: Request, res: Response) {
        try {
            const exercises = await this.exerciseService.getAllExercises();
            return res.status(200).json(exercises)
        } catch (error) {
            return res.status(500).json({ message: "Error while getting all exercises" });
        }
    }

    async deleteExercise(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const exercises = await this.exerciseService.deleteExercise(id);
            return res.status(200).json(exercises);
        } catch (error) {
            return res.status(500).json({ message: "Error while deleting exercise" });
        }
    }

    async createExercise(req: Request, res: Response) {
        try {
            const exercises = await this.exerciseService.createExercise(req, res);
            return res.status(200).json(exercises);
        } catch (error) {
            return res.status(500).json({ message: "Error while creating exercise" });
        }
    }

    async updateExercise(req: Request, res: Response) {
        try {
            const exercises = await this.exerciseService.updateExercise(req, res);
            return res.status(200).json(exercises);
        } catch (error) {
            return res.status(500).json({ message: "Error while updating exercise" });
        }
    }

    buildRouter(): Router {
        const router = Router();
        router.get('/', this.getAllExercises.bind(this));
        router.delete('/:id', this.deleteExercise.bind(this));
        router.post('/', this.createExercise.bind(this));
        router.put('/:id', this.updateExercise.bind(this));
        return router;
    }

}