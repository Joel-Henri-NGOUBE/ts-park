export type Difficulty = "Easy" | "Medium" | "Hard"

export interface Room{
    name: string,
    userId: string,
    capacity: number,
    difficulty?: Difficulty,
    address: string,
    contact: string | number,
    equipment: string
}