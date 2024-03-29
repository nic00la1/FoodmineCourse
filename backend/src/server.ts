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
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);

// Serve Angular files
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter );

const port = 5000; // default port to listen
app.listen(port, () => {
  console.log("Website served at http://localhost:" + port);
});
