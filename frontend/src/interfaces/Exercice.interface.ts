
export interface Exercise {
    name: string,
    description: string,
    muscle: string,
    difficulty: "Easy" | "Medium" | "Hard",
    calories: number,
    duration: number,
    score: number // The score given by the exercice
}