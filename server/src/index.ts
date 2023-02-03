import express from "express";
import cors from "cors";
import "dotenv/config";
import rootRouter from "./routers/rootRouter";

const app = express();

app.use(cors({
    origin: process.env.AUDIENCE!
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);

app.listen(process.env.PORT!, () => {
    console.log("Server has started!");
});