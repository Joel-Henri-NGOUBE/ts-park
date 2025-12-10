/**
 * To know which exercise has been done by which user for the challenge
 */
export interface ExerciseChallengeUser{
    order: number,
    challengeId: string,
    exerciseId: string,
    userId: string,
    done: boolean,
    date: string
}