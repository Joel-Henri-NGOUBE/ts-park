import { Request, Response, Router } from "express"
// import { getUserModel } from "../services/schema/user.schema";
import bcrypt from "bcryptjs"
import { Challenge, User } from "../models";
import jwt from "jsonwebtoken"
import { getChallengeModel } from "../services/schema/challenge.schema";
import mongoose from "mongoose";
import { getExerciseChallengeModel } from "../services/schema/exercise_challenge.schema";
// import Request, Response from "express"

type Exercise = {
    id: mongoose.Types.ObjectId,
    order: number
}

export class ChallengeController{
    // readonly lessonService: LessonService

    private challengeModel = getChallengeModel()
    private exerciseChallengeModel = getExerciseChallengeModel()

    constructor(
        // lessonService: LessonService
    ){
        // this.lessonService = lessonService
    }

    // async login(req: Request, res: Response){
    //     const { username, password } = req.body


    //     const user: User  = await this.userModel.findOne({
    //         username: username
    //     }) as User

    //     const isPasswordValid: boolean = bcrypt.compareSync(password, user.password)

    //     if(isPasswordValid){
    //         const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET as string)
    //         await this.userModel.updateOne({ username: username}, {
    //             token: token
    //         })
    //         res.json({token: token})
    //     }
    // }

    // async signup(req: Request, res: Response){
    //     const { username, password } = req.body


    //     await this.userModel.insertMany({
    //         username: username,
    //         password:  bcrypt.hashSync(password, bcrypt.genSaltSync()) ,
    //         token: "",
    //         isActive: true,
    //         role: "user",
    //         score: 0
    //     })

    //     return res.json({message: "User created"})
    // }

    async create(req: Request, res: Response){
        const token = req.headers?.authorization?.split(" ")[1]
        const payload = jwt.verify(token as string, process.env.JWT_SECRET as string) as User
        const { name, difficulty, exercises } = req.body
        const inserted = await this.challengeModel.insertOne({
            name: name,
            userId: new mongoose.Types.ObjectId(payload._id),
            type: "user",
            difficulty: difficulty
        })
        console.log(inserted)
        this.exerciseChallengeModel.insertMany((exercises as Exercise[]).map((e) => {        
                return {
                    order: e.order,
                    exerciseId: e.id,
                    challengeId: (inserted as Challenge)._id
                }
            
        }))
    }

    buildRouter(): Router{
        const router: Router = Router();
        router.post("/create", this.create.bind(this))
        // router.post("/signup", this.signup.bind(this))
        return router
    }
}