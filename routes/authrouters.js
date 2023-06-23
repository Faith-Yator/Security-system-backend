import {  SignIn ,Register} from "../controllers/authcontroller.js"
import { Router } from "express"


export const authRouter = Router()

authRouter.post("/SignIn", SignIn)
 authRouter.post("/Register", Register)

