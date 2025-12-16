import { config } from "dotenv";
import { OpenMongooseConnection } from "./services/utils";
import { AuthController } from "./controllers";
import express from "express"
import Cors from "cors"
import { ChallengeController } from "./controllers/challenge.controller copy";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services";
import { ExerciseController } from "./controllers/exercice.controller";
import { ExerciseService } from "./services/exercice.services";
import { RoomService } from "./services/room.services";
import { RoomController } from "./controllers/room.controller";

config()

const app = express()

app.use(express.json())

app.use(Cors({ origin: "http://localhost:5173" }))

async function main() {
    await OpenMongooseConnection()
}

main().catch(console.error)
const userService = new UserService();
const exerciseService = new ExerciseService();
const roomService = new RoomService();
// const userModel = getUserModel()

const authController = new AuthController()
const challengeController = new ChallengeController()
const userController = new UserController(userService)
const exerciseController = new ExerciseController(exerciseService)
const roomController = new RoomController(roomService)

app.use("/auth", authController.buildRouter())
app.use("/challenge", challengeController.buildRouter())
app.use("/users", userController.buildRouter())
app.use("/exercises", exerciseController.buildRouter())
app.use("/rooms", roomController.buildRouter())


app.listen(3000, function () {
    console.log("Listening on the port 3000: http://localhost:3000")
})