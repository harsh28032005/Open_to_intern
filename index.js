import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import college_route from "./routes/college.js";

const app = express();

app.use(express.json());
app.use("", college_route);

mongoose
  .connect(process.env.Mongo_Url)
  .then(() => console.log("MongoDb Database is connected successfully"))
  .catch((err) => console.log("Error to connect MongoDb Database", err));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on the port ${process.env.PORT}`)
);
