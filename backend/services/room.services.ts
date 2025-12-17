import { Request, Response, Router } from "express";
import { RoomModel } from "./schema/room.schema";
import { verify } from "crypto";
import { verifyObjectId } from "../fonction";
import { UserModel } from "./schema/user.schema";
export class RoomService {
    public async getAllRooms() {
        try {
            const getAllRooms = await RoomModel.find();
            return getAllRooms;
        } catch (error) {
            throw new Error("Error while getting all rooms");
        }
    }

    public async getRoomById(roomId: string) {
        verifyObjectId(roomId);
        try {
            const getRoomById = await RoomModel.findById(roomId);
            if (!getRoomById) {
                throw new Error("Room not found");
            }
            return getRoomById;
        } catch (error) {
            throw new Error("Error while getting room by id  ");
        }
    }

    public async getAllRoomByStatus(status: string) {

        if (status != "Pending" && status != "Accepted" && status != "Refused") {
            throw new Error("Status need to be:  Pending || Accepted || Refused");
        }
        try {
            const getAllRoomByStatus = await RoomModel.find({ roomStatus: status });
            return getAllRoomByStatus;
        } catch (error) {
            throw new Error("Error while getting all rooms by status");
        }
    }

    public async createRoom(req: Request, res: Response) {
        const room = req.body;
        try {
            const newRoom = new RoomModel(room);
            const existingRoom = await RoomModel.findOne({ name: newRoom.name });
            if (newRoom.name === "") {
                throw new Error("Room name is required");
            }

            if (existingRoom) {
                throw new Error("Room already exists");
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
            return await RoomModel.findByIdAndDelete(roomId);

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
            const existingRoom = await RoomModel.findByIdAndUpdate(roomId, room);
            console.log(existingRoom);
            if (!existingRoom) {
                return res.status(404).json({ message: "Room not found" });
            }
            return existingRoom;

        } catch (error) {
            return res.status(500).json({ message: "Error while updating room" });
        }
    }

    public async changeStatusRoom(req: Request, res: Response) {
        const roomId = req.params.roomId;
        const status = req.body.roomStatus;
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
            return await RoomModel.findByIdAndUpdate(roomId, { roomStatus: status });
        } catch (error) {
            return res.status(500).json({ message: "Error while updating room status" });
        }

    }

    public async addRoomOwner(roomId: string, userId: string) {
        verifyObjectId(roomId);
        verifyObjectId(userId);
        try {
            const user = await UserModel.findById(userId);
            const room = await RoomModel.findByIdAndUpdate(roomId, { ownerUserId: userId });
            if (!room || !user) {
                throw new Error("Room or user not found");
            }
            return room;
        } catch (error) {
            throw new Error("Error while adding room owner");
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