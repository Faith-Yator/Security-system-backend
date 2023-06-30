import { getUsers,getUser, newUsers, updateUser,deleteUser } from "../controllers/Signincontroller.js";
import {Router} from "express"



export const SignInRouter = Router()

  SignInRouter.get("/",getUsers)
  SignInRouter.get("/:id",getUser)
  SignInRouter.post("/new", newUsers)
  SignInRouter.put("/:id/update",updateUser)
  SignInRouter.delete("/:id/delete" ,deleteUser)