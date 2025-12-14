export type Difficulty = "Easy" | "Medium" | "Hard";
export interface Room {
    roomId: string,
    name: string,
    ownerUserId: string,
    capacity: number,
    difficulty?: Difficulty,
    address: string,
    contact: string | number,
    equipment: string,
    roomStatus: "Pending" | "Accepted" | "Refused"
}