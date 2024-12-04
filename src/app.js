import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.config.js";
import { indexRouter } from "./routes/index.route.js";

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

export default app;
