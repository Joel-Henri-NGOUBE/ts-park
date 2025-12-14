import { RoomService } from "../services/room.services"
import { Request, Response } from "express"
import { Router } from "express"

export class RoomController {
    private roomService: RoomService
    constructor(roomService: RoomService) {
        this.roomService = roomService
    }
    public async getAllRooms(req: Request, res: Response) {
        const rooms = await this.roomService.getAllRooms(req, res);
        res.json(rooms);
    }

    public async getRoomById(req: Request, res: Response) {
        const room = await this.roomService.getRoomById(req, res);
        res.json(room);
    }

    public async getAllRoomByStatus(req: Request, res: Response) {
        const rooms = await this.roomService.getAllRoomByStatus(req, res);
        res.json(rooms);
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

    buildRouter(): Router {
        const router = Router();
        router.get('/', this.getAllRooms.bind(this));
        router.get('/:roomId', this.getRoomById.bind(this));
        router.post('/', this.createRoom.bind(this));
        router.put('/:roomId/update', this.updateRoom.bind(this));
        router.put('/:roomId/status', this.changeStatusRoom.bind(this));
        router.delete('/:roomId', this.deleteRoom.bind(this));
        router.get('/:status/findStatus', this.getAllRoomByStatus.bind(this));

        return router;
    }

}

