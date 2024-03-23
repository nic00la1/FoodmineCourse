import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";

const app = express();
app.use(express.json());
// localhost:4200 is the default port for Angular
// localhost:5000 we will use for our server

// thats why:
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);

const port = 5000; // default port to listen
app.listen(port, () => {
  console.log("server started at http://localhost:" + port);
});
