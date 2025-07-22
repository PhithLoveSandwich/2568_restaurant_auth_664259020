import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from "./models/db.js";
import Role from "./models/role_model.js";
db.sync({force:false})
.then(() => {
    Role.create({ id: 1, name: "user" });
    Role.create({ id: 2, name: "moderator" });
    Role.create({ id: 3, name: "admin" });    
})
.catch((error)=>{
    console.log("Error creating table role", error);
});

app.get('/', (req, res) => {
  res.send('Restaurant Restful API');
});

app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
