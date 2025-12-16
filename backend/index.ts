import { config } from "dotenv";
import { OpenMongooseConnection } from "./services/utils";
import { getUserModel } from "./services/schema/user.schema";
import { AuthController } from "./controllers";
import express from "express"
import Cors from "cors"
import { ChallengeController } from "./controllers/challenge.controller copy";

config()

const app = express()

app.use(express.json())

app.use(Cors({origin: "http://localhost:5173"}))

async function main(){
    await OpenMongooseConnection()
}

main().catch(console.error)

// const userModel = getUserModel()

const authController = new AuthController()
const challengeController = new ChallengeController()

app.use("/auth", authController.buildRouter())
app.use("/challenge", challengeController.buildRouter())

app.listen(3000, function(){
    console.log("Listening")
})