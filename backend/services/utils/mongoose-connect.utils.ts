import { connect, Mongoose } from "mongoose";

export function OpenMongooseConnection(): Promise<Mongoose>{
    if(typeof process.env.MONGODB_URI === undefined){
        throw new Error("Missing MONGODB-URI variable")
    }
    console.log(process.env.MONGODB_URI)
    return connect(process.env.MONGODB_URI as string, {
        dbName: process.env.MONGODB_DATABASE
    })
}