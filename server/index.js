import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.router.js";
import db from "./models/db.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from "./models/db.js";
const role = db.Role;

db.sequelize.sync({ force: true }).then(async () => {  // ใช้ force: true เพื่อสร้างตารางใหม่ (ถ้าอยากล้างข้อมูลเก่า)
  console.log("Database synced");
  await initRole();  // เรียกใช้และรอสร้าง role
});

const initRole = async () => {
  try {
    await role.create({ id: 1, name: "user" });
    await role.create({ id: 2, name: "moderator" });
    await role.create({ id: 3, name: "admin" });
    console.log("Roles created.");
  } catch (error) {
    console.error("Error creating roles:", error);
  }
};

app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

app.get('/', (req, res) => {
  res.send('Restaurant Restful API');
});

app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
