import { getContactuss,getContactus, newContactuss, updateContactus,deleteContactus } from "../controllers/Contactuscontroller.js";
import {Router} from "express"
import { VerifyToken } from "../middlewares/VerifyToken.js"


export const ContactusRouter = Router()

ContactusRouter.get("/",VerifyToken,getContactuss)
ContactusRouter.post("/new", VerifyToken,newContactuss)
ContactusRouter.get("/:id",VerifyToken,getContactus)
ContactusRouter.put("/:id/update",VerifyToken,updateContactus)
ContactusRouter.delete("/:id/delete" ,VerifyToken,deleteContactus)