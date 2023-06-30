import { Login,Register} from "../controllers/authcontroller.js"
import { Router } from "express"


export const authRouter = Router()

authRouter.post("/Login", Login)
 authRouter.post("/Register", Register)






