import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import college_route from "./routes/college.js";
import intern_route from "./routes/intern.js";

const app = express();

app.use(express.json());
app.use("", college_route);
app.use("", intern_route);

mongoose
  .connect(process.env.Mongo_Url)
  .then(() => console.log("MongoDb Database is connected successfully"))
  .catch((err) => console.log("Error to connect MongoDb Database", err));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on the port ${process.env.PORT}`)
);
