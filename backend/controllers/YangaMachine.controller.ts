import { Request, Response } from "express"
import { Router } from "express"
import { YangaMachineService } from "../services/yangaMachine.services"

export class YangaMachineController {
    private yangaMachineService: YangaMachineService
    constructor(yangaMachineService: YangaMachineService) {
        this.yangaMachineService = yangaMachineService;
    }

    public async createYanga(req: Request, res: Response) {
        const yangaMachine = req.body;
        try {
            const newYangaMachine = await this.yangaMachineService.createYanga(yangaMachine);
            res.status(201).json(newYangaMachine)
        } catch (error) {
            res.status(500).json({ error: error, message: "Error creating yanga machine" })
        }
    }

    public async deleteYangaById(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const deletedYangaMachine = await this.yangaMachineService.deleteYangaById(id)
            res.status(200).json({ deletedYangaMachine, message: "Yanga machine have been deleted" })
        } catch (error) {
            res.status(500).json({ error: error, message: "Error deleting yanga machine" })
        }
    }

    public async getAllYangas(req: Request, res: Response) {
        try {
            const yangas = await this.yangaMachineService.getAllYangas()
            res.status(200).json(yangas)
        } catch (error) {
            res.status(500).json({ error: error, message: "Error getting yangas" })
        }
    }

    public async getYangaById(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const yangaMachine = await this.yangaMachineService.getYangaById(id)
            res.status(200).json(yangaMachine)
        } catch (error) {
            res.status(500).json({ error: error, message: "Error getting yanga machine" })
        }
    }

    public async showYangaToRefill(req: Request, res: Response) {
        try {
            const yangas = await this.yangaMachineService.showYangaToRefill()
            res.status(200).json(yangas)
        } catch (error) {
            res.status(500).json({ error: error, message: "Error getting yangas to refill" })
        }
    }

    public async refillYanga(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const yangaMachine = await this.yangaMachineService.refillYanga(id)
            res.status(200).json({ message: "Yanga machine have been refilled", yangaMachine })
        } catch (error) {
            res.status(500).json({ error: error, message: "Error refilling yanga machine" })
        }
    }

    public async takeYangaCup(req: Request, res: Response) {
        const id = req.params.id;
        const flavor = req.body.flavor;
        try {
            const yangaMachine = await this.yangaMachineService.takeYangaCup(id, flavor)
            res.status(200).json({ message: "you take a yanga", yangaMachine })
        } catch (error) {
            res.status(500).json({ error: error, message: "Error refilling yanga machine" })
        }
    }

    buildRouter(): Router {
        const router = Router();
        router.post("/", this.createYanga.bind(this));
        router.get("/", this.getAllYangas.bind(this));
        router.get("/refill", this.showYangaToRefill.bind(this));
        router.get("/:id", this.getYangaById.bind(this));
        router.delete("/:id", this.deleteYangaById.bind(this));
        router.put("/:id/refill", this.refillYanga.bind(this));
        router.put("/:id/take", this.takeYangaCup.bind(this));
        return router;
    }

}