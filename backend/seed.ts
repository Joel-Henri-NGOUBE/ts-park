import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { RoomModel, UserModel, YangaModel, ChallengeModel, ExerciseModel, BadgeModel } from "./services/schema";


async function seed() {
    await mongoose.connect(process.env.MONGODB_URI as string);

    // ⚠️ Optionnel : vider les collections
    await UserModel.deleteMany({});
    await RoomModel.deleteMany({});
    await YangaModel.deleteMany({});
    await ChallengeModel.deleteMany({});
    await ExerciseModel.deleteMany({});
    await BadgeModel.deleteMany({});

    // USERS
    const users = await UserModel.insertMany([
        { username: "admin", password: "$2b$10$SkEoL8qg7snWa0.dOCWcqezzzj3SBVvvJKNosI5PjwpgDpIvj7M.a", token: "t1", isActive: true, role: "superadmin", score: 1200 },
        { username: "manager", password: "$2b$10$SkEoL8qg7snWa0.dOCWcqezzzj3SBVvvJKNosI5PjwpgDpIvj7M.a", token: "t2", isActive: true, role: "manager", score: 600 },
        { username: "user1", password: "$2b$10$SkEoL8qg7snWa0.dOCWcqezzzj3SBVvvJKNosI5PjwpgDpIvj7M.a", token: "t3", isActive: true, role: "user", score: 300 },
        { username: "user2", password: "$2b$10$SkEoL8qg7snWa0.dOCWcqezzzj3SBVvvJKNosI5PjwpgDpIvj7M.a", token: "t4", isActive: false, role: "user", score: 100 }
    ]);

    // ROOMS
    const rooms = await RoomModel.insertMany([
        { name: "Room A", ownerUserId: users[1]._id, capacity: 6, difficulty: "Easy", address: "Paris", contact: "0601", equipment: "Basic", roomStatus: "Accepted" },
        { name: "Room B", ownerUserId: users[1]._id, capacity: 8, difficulty: "Medium", address: "Lyon", contact: "0602", equipment: "Cardio", roomStatus: "Pending" },
        { name: "Room C", ownerUserId: users[0]._id, capacity: 10, difficulty: "Hard", address: "Marseille", contact: "0603", equipment: "Crossfit", roomStatus: "Accepted" },
        { name: "Room D", ownerUserId: users[2]._id, capacity: 4, difficulty: "Easy", address: "Lille", contact: "0604", equipment: "Poids", roomStatus: "Refused" }
    ]);

    // YANGA MACHINES
    await YangaModel.insertMany([
        { nameMachine: "Yanga A", flavor: ["Citron"], max_litres: 20, current_litres: 5, room_id: rooms[0]._id },
        { nameMachine: "Yanga B", flavor: ["Fraise"], max_litres: 15, current_litres: 10, room_id: rooms[1]._id },
        { nameMachine: "Yanga C", flavor: ["Mangue"], max_litres: 25, current_litres: 8, room_id: rooms[2]._id },
        { nameMachine: "Yanga D", flavor: ["Orange"], max_litres: 10, current_litres: 3, room_id: rooms[3]._id }
    ]);

    // BADGES
    await BadgeModel.insertMany([
        { name: "Beginner", score: 100 },
        { name: "Intermediate", score: 300 },
        { name: "Advanced", score: 700 },
        { name: "Master", score: 1200 }
    ]);

    // EXERCISES
    await ExerciseModel.insertMany([
        { name: "Pompes", description: "Haut du corps", muscle: "Pectoraux", difficulty: "Easy", calories: 50, duration: 10, score: 20 },
        { name: "Squats", description: "Jambes", muscle: "Quadriceps", difficulty: "Easy", calories: 70, duration: 15, score: 30 },
        { name: "Burpees", description: "Cardio", muscle: "Full body", difficulty: "Hard", calories: 120, duration: 10, score: 60 },
        { name: "Planche", description: "Gainage", muscle: "Abdos", difficulty: "Medium", calories: 40, duration: 5, score: 25 }
    ]);

    console.log("✅ Database seeded");
    console.log(process.env.MONGODB_URI);
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
