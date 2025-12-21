import { Request, Response, Router } from "express"
import { UserModel } from "../services/schema/user.schema";
import bcrypt from "bcryptjs"
import { User } from "../models";
import jwt from "jsonwebtoken"
// import Request, Response from "express"
export class AuthController {
    // readonly lessonService: LessonService

    private userModel = UserModel

    constructor(
        // lessonService: LessonService
    ) {
        // this.lessonService = lessonService
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body

        const user: User = await this.userModel.findOne({
            username: username
        }) as User

        const isPasswordValid: boolean = bcrypt.compareSync(password, user.password)
        if (isPasswordValid) {
            const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET as string)
            await this.userModel.updateOne({ username: username }, {
                token: token
            })
            res.json({ token: token })
        }
    }

    async signup(req: Request, res: Response) {
        const { username, password } = req.body


        await this.userModel.insertOne({
            username: username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
            token: "",
            isActive: true,
            role: "user",
            score: 0
        })

        return res.json({ message: "User created" })
    }

    async create(req: Request, res: Response) {

    }

    buildRouter(): Router {
        const router: Router = Router();
        router.post("/login", this.login.bind(this))
        router.post("/signup", this.signup.bind(this))
        return router
    }
}