import { config } from "dotenv";
import { OpenMongooseConnection } from "./services/utils";
import { AuthController } from "./controllers";
import express from "express"
import Cors from "cors"
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services";
import { ExerciseController } from "./controllers/exercice.controller";
import { ExerciseService } from "./services/exercice.services";

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
// const userModel = getUserModel()

const authController = new AuthController()
const userController = new UserController(userService)
const exerciseController = new ExerciseController(exerciseService)

app.use("/auth", authController.buildRouter())
app.use("/users", userController.buildRouter())
app.use("/exercises", exerciseController.buildRouter())


app.listen(3000, function () {
    console.log("Listening on the port 3000: http://localhost:3000")
})