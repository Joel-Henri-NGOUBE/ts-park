import { config } from "dotenv";
import { OpenMongooseConnection } from "./services/utils";
import { getUserModel } from "./services/schema/user.schema";

config()

async function main(){
    await OpenMongooseConnection()
}

main().catch(console.error)

const userModel = getUserModel()

userModel.insertMany([{
    username: "superadmin",
    password: "password",
    token: "token",
    isActive: true,
    role: "superadmin",
    score: 0
}, {
    username: "manager1",
    password: "password",
    token: "token",
    isActive: true,
    role: "manager",
    score: 0
}, {
    username: "user1",
    password: "password",
    token: "token",
    isActive: true,
    role: "user",
    score: 0
}])

