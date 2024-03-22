import express from "express";
import cors from "cors";
import { sample_foods } from "./data";

const app = express();
// localhost:4200 is the default port for Angular
// localhost:5000 we will use for our server

// thats why:
app.use( 
  cors({
    credentials: true,
    origin: "http://localhost:4200", 
  })
);

app.get("/api/foods", (req, res) => {
    res.send(sample_foods);
})

const port = 5000; // default port to listen
app.listen(port, () => {
    console.log("server started at http://localhost:" + port);
})