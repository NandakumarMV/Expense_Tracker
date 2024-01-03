import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

//Connecting DataBase
import connectDb from "./config/db.js";
connectDb();

import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("server is ready"));

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Sever Started on port ${port}`));
