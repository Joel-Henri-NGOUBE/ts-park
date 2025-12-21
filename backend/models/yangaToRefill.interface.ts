import { Types } from "mongoose";

export interface YangaToRefill {
    yangaId: Types.ObjectId;
    roomId: Types.ObjectId;
}