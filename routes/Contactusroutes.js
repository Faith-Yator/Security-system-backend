import { getContactuss,getContactus, newContactuss, updateContactus,deleteContactus } from "../controllers/Contactuscontroller.js";
import {Router} from "express"
//import { verifyToken } from "../middlewares/veryfytoken.js"


export const ContactusRouter = Router()

ContactusRouter.get("/",getContactuss)
ContactusRouter.get("/:id",getContactus)
ContactusRouter.post("/new", newContactuss)
ContactusRouter.put("/:id/update",updateContactus)
ContactusRouter.delete("/:id/delete" ,deleteContactus)