import express from "express";
import configViewEngine from "./configs/viewEngine";
import initAPIRoute from "./route/api";
import cors from "cors";

// import connection from './configs/connectDB';

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// setup view engine
configViewEngine(app);

// init api route
initAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
