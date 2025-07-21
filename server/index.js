import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import restaurantRouter from "./routers/restaurant.router.js";

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

app.get('/', (req, res) => {
  res.send('Restaurant Restful API');
});

app.use("/api/v1/restaurant", restaurantRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
