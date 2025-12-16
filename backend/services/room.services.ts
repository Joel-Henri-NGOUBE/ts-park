import { Request, Response, Router } from "express";
import { RoomModel } from "./schema/room.schema";
export class RoomService {
    public async getAllRooms(req: Request, res: Response) {
        try {
            const getAllRooms = await RoomModel.find();
            return getAllRooms;
        } catch (error) {
            return res.status(404).json({ message: "Error while getting all rooms", error });
        }
    }

    public async getRoomById(req: Request, res: Response) {
        const roomId = req.params.roomId;
        if (roomId === "") {
            return res.status(404).json({ message: "RoomId is required to found room" });
        }
        try {
            const getRoomById = await RoomModel.findOne({ roomId: roomId });
            if (!getRoomById) {
                return res.status(404).json({ message: "Room not found" });
            }
            return getRoomById;
        } catch (error) {
            return res.status(404).json({ message: "Error while getting room by id  ", error });

        }
    }

    public async getAllRoomByStatus(req: Request, res: Response) {
        const status = req.params.status;
        if (status != "Pending" && status != "Accepted" && status != "Refused") {
            return res.status(404).json({ message: "Status need to be:  Pending || Accepted || Refused" });
        }
        try {
            const getAllRoomByStatus = await RoomModel.find({ roomStatus: status });
            return getAllRoomByStatus;
        } catch (error) {
            return res.status(404).json({ message: "Error while getting all rooms status", error });
        }
    }

    public async createRoom(req: Request, res: Response) {
        const room = req.body;
        console.log(room);
        try {
            const newRoom = new RoomModel(room);
            const existingRoom = await RoomModel.findOne({ name: newRoom.name });
            if (newRoom.name === "") {
                return res.status(400).json({ message: "Room name is required" });
            }

            if (existingRoom) {
                return res.status(409).json({ message: "Room already exists" });
            }
            return await newRoom.save();
        } catch (error) {
            return res.status(500).json({ message: "Error while creating room" });
        }
    }

    public async deleteRoom(req: Request, res: Response) {
        const roomId = req.params.roomId;
        if (roomId === "") {
            return res.status(404).json({ message: "RoomId is required" });
        }
        try {
            const existingRoom = await RoomModel.findOne({ roomId: roomId });
            if (!existingRoom) {
                return res.status(404).json({ message: "Room not found" });
            }
            return await RoomModel.deleteOne({ roomId: roomId });
        } catch (error) {
            return res.status(500).json({ message: "Error while deleting room" });
        }
    }

    public async updateRoom(req: Request, res: Response) {
        const roomId = req.params.roomId;
        const room = req.body;
        if (roomId === "") {
            return res.status(404).json({ message: "RoomId is required" });
        }
        try {
            const existingRoom = await RoomModel.findOne({ roomId: roomId });
            if (!existingRoom) {
                return res.status(404).json({ message: "Room not found" });
            }
            return await RoomModel.updateOne({ roomId: roomId }, room);
        } catch (error) {
            return res.status(500).json({ message: "Error while updating room" });
        }
    }

    public async changeStatusRoom(req: Request, res: Response) {
        const roomId = req.params.roomId;
        const status = req.body.roomStatus;
        console.log(status);
        console.log(roomId);
        if (status === "") {
            return res.status(404).json({ message: "Status is required to found room" });
        }
        else if (status != "Pending" && status != "Accepted" && status != "Refused") {
            return res.status(404).json({ message: "Status need to be:  Pending || Accepted || Refused" });
        }
        if (roomId === "") {
            return res.status(404).json({ message: "RoomId is required to found room" });
        }
        try {
            return await RoomModel.updateOne({ roomId: roomId }, { roomStatus: status });
        } catch (error) {
            return res.status(500).json({ message: "Error while updating room status" });
        }

    }

    buildRouter(): Router {
        const router = Router();
        router.get('/rooms', this.getAllRooms.bind(this));
        router.get('/rooms/:roomId', this.getRoomById.bind(this));
        router.post('/rooms', this.createRoom.bind(this));
        router.put('/rooms/:roomId/update', this.updateRoom.bind(this));
        router.put('/rooms/:roomId/status', this.changeStatusRoom.bind(this));
        router.delete('/rooms/:roomId', this.deleteRoom.bind(this));
        router.get('/rooms/:status/findStatus', this.getAllRoomByStatus.bind(this));

        return router;
    }
}