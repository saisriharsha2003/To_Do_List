import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'; 

const app = express();

const port = 8080;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());

import userRouter from "./routes/Routes.js";

const mongoURI = MONGODB_URL;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => {
  console.log("Connected to MongoDB Atlas!");
})

.catch((error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
});

app.use("/api/user", userRouter);

const server = app.listen(port, "0.0.0.0", () => {
  console.log("Server started on port "+port);
});
