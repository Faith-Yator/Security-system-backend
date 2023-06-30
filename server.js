import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import the cors package
import { NewslaterRouter } from "./routes/Newslaterroutes.js";
import { PopupRouter } from "./routes/Popuproutes.js";
import { ContactusRouter } from "./routes/Contactusroutes.js";
import { authRouter } from "./routes/authrouters.js";
import{SignInRouter} from './routes/Signinrouters.js'

dotenv.config();

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use("/Newslaters", NewslaterRouter);
app.use("/Popups", PopupRouter);
app.use("/Contactuss", ContactusRouter);
app.use("/User", SignInRouter);
app.use("/auth", authRouter);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
