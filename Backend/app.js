import 'dotenv/config'

import mongoose from 'mongoose';
import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";

//My Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const app = express();


//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MyRoutes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});