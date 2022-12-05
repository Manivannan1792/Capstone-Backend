import express from "express";
import { MongoClient } from "mongodb";
import {mongoose} from "mongoose";
import cors from "cors";
const app = express();
import dotenv from "dotenv";

import { dressRouter } from "./routes/dress.js";
import { usersRouter } from "./routes/users.js";
dotenv.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log("DB connected");
}).catch(error=>console.log(error));

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb is connected");
  return client;
}
//top level await -es6
export const client = await createConnection();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/dress", dressRouter);
app.use(usersRouter);
app.listen(PORT, () => console.log(`App listening on  ${PORT}`));


