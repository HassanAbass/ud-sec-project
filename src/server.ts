import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/users";
import { SERVER_PORT } from "./constants";

const app: express.Application = express();

app.use(bodyParser.json());

app.use("/", userRoutes);

app.listen(SERVER_PORT, function () {
    console.log(`starting app on: ${process.env.POSTGRES_HOST}:${SERVER_PORT}`);
});
