import { verifyObjectId } from "../fonction";
import { Yanga } from "../models/yanga.interface";
import { RoomModel, YangaModel } from "./schema";


export class YangaMachineService {

    public async createYanga(yangaMachine: Yanga) {
        const newYangaMachine = new YangaModel(yangaMachine);
        const room = await RoomModel.findById(yangaMachine.room_id);
        if (!room) {
            throw new Error("Room not found, we can't create a yangaMachine without a good ID");
        }
        if (!newYangaMachine.nameMachine || !newYangaMachine.flavor || !newYangaMachine.max_litres) {
            throw new Error("Empty fields");
        }
        try {
            return await newYangaMachine.save();
        } catch (error) {
            throw new Error("Error creating yanga machine");
        }
    }

    public async deleteYangaById(id: string) {
        verifyObjectId(id);
        try {
            return await YangaModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Error deleting yanga machine");
        }
    }

    public async getAllYangas() {
        try {
            return await YangaModel.find();
        } catch (error) {
            throw new Error("Error getting yangas");
        }
    }

    public async getYangaById(id: string) {
        verifyObjectId(id);
        try {
            return await YangaModel.findById(id);
        } catch (error) {
            throw new Error("Error getting yanga machine");

        }
    }

    public async showYangaToRefill() {
        try {
            return await YangaModel.find({
                $expr: {
                    $lt: ["$current_litres", { $divide: ["$max_litres", 2] }]
                }
            });
        } catch (error) {
            throw new Error("Error getting yangas to refill");
        }
    }

    public async takeYangaCup(id: string, flavor: string) {
        verifyObjectId(id);


        try {
            const yanga = await YangaModel.findById(id);
            if (!yanga) {
                throw new Error("Yanga machine not found");
            }
            if (yanga.current_litres < 1.5) {
                return { message: "Yanga machine is empty" };
            }
            if (!yanga.flavor.includes(flavor)) {
                return { message: "Yanga machine have to be one of these flavors", flavor: yanga.flavor };
            }
            const new_litres = yanga.current_litres - 1.5;
            return await YangaModel.findByIdAndUpdate(id, { $set: { current_litres: new_litres } });
        } catch (error) {
            throw new Error("Error taking yanga cup");
        }
    }

    public async refillYanga(id: string) {
        verifyObjectId(id);
        try {
            const yanga = await YangaModel.findById(id);
            const max_litres = yanga?.max_litres;
            return await YangaModel.findByIdAndUpdate(id, { $set: { current_litres: max_litres } });
        } catch (error) {
            throw new Error("Error refilling yanga machine");
        }
    }

}