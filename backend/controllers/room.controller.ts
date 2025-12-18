import { RoomService } from "../services/room.services"
import { Request, Response } from "express"
import { Router } from "express"

export class RoomController {
    private roomService: RoomService
    constructor(roomService: RoomService) {
        this.roomService = roomService
    }
    public async getAllRooms(req: Request, res: Response) {
        try {
            const rooms = await this.roomService.getAllRooms();
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ message: "Error while getting all rooms" });
        }
    }

    public async getRoomById(req: Request, res: Response) {
        const roomId = req.params.roomId;
        const room = await this.roomService.getRoomById(roomId);
        try {
            res.status(200).json(room);
        } catch (error) {
            res.status(500).json({ message: "Error while getting room by id" });
        }
    }

    public async getAllRoomByStatus(req: Request, res: Response) {
        const status = req.params.status;
        try {
            const rooms = await this.roomService.getAllRoomByStatus(status);
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ message: "Error while getting all rooms by status" });
        }
    }

    public async createRoom(req: Request, res: Response) {
        const room = await this.roomService.createRoom(req, res);
        res.json(room);
    }

    public async deleteRoom(req: Request, res: Response) {
        const room = await this.roomService.deleteRoom(req, res);
        res.json(room);
    }

    public async updateRoom(req: Request, res: Response) {
        const room = await this.roomService.updateRoom(req, res);
        res.json(room);
    }

    public async changeStatusRoom(req: Request, res: Response) {
        const room = await this.roomService.changeStatusRoom(req, res);
        res.json(room);
    }

    public async addRoomOwner(req: Request, res: Response) {
        const roomId = req.body.roomId;
        const userId = req.body.userId;
        try {
            const room = await this.roomService.addRoomOwner(roomId, userId);
            res.json(room);
        } catch (error) {
            res.status(500).json({ message: "Error while adding room owner" });
        }
    }

    buildRouter(): Router {
        const router = Router();
        router.get('/', this.getAllRooms.bind(this));
        router.get('/:roomId', this.getRoomById.bind(this));
        router.post('/', this.createRoom.bind(this));
        router.put('/:roomId/update', this.updateRoom.bind(this));
        router.put('/:roomId/status', this.changeStatusRoom.bind(this));
        router.delete('/:roomId', this.deleteRoom.bind(this));
        router.get('/:status/findStatus', this.getAllRoomByStatus.bind(this));
        router.put('/owner', this.addRoomOwner.bind(this));
        return router;
    }

}

