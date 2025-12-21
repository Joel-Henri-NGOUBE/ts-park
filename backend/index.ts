import { config } from "dotenv";
import { OpenMongooseConnection } from "./services/utils";
import express from "express"
import Cors from "cors"
import { AuthController, BadgeController, ChallengeController, ExerciseController, RoomController, UserBadgeController, UserController, YangaMachineController } from "./controllers";
import { BadgeService, ExerciseService, RoomService, UserBadgeService, UserService, YangaMachineService } from "./services";

config()

const app = express()

app.use(express.json())

app.use(Cors({ origin: ["http://localhost:5173", "https://ts-park-frontend-v1-0-1.onrender.com"] }))

async function main() {
    await OpenMongooseConnection()
}

main().catch(console.error)
const userService = new UserService();
const exerciseService = new ExerciseService();
const roomService = new RoomService();
const badgeService = new BadgeService();
const yangaMachineService = new YangaMachineService();
// const userModel = getUserModel()

const authController = new AuthController()
const challengeController = new ChallengeController()
const userController = new UserController(userService)
const exerciseController = new ExerciseController(exerciseService)
const roomController = new RoomController(roomService)
const badgeController = new BadgeController(badgeService)
const yangaMachineController = new YangaMachineController(yangaMachineService)

app.use("/auth", authController.buildRouter())
app.use("/challenge", challengeController.buildRouter())
app.use("/users", userController.buildRouter())
app.use("/exercises", exerciseController.buildRouter())
app.use("/rooms", roomController.buildRouter())
app.use("/badges", badgeController.buildRouter())
app.use("/yanga", yangaMachineController.buildRouter())

app.listen(3000, function () {
    console.log("Listening on the port 3000: http://localhost:3000")
})