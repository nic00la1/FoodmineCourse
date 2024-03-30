import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import orderRouter from "./routers/order.router";
import { dbConnect } from "./configs/database.config";
import path from "path";
dbConnect();

const app = express();

// Middleware - JSON parsing
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://foodmine-erhd.onrender.com" || "http://localhost:4200",
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter );

app.use(express.static('public/browser')); 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'browser', 'index.html'));
});

const port = process.env.PORT || 5000; // default port to listen
app.listen(port, () => {
  console.log("Website served at http://localhost:" + port);
});
