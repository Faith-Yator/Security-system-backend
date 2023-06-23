import { getNewslaters,getNewslater, newNewslaters, updateNewslater,deleteNewslater } from "../controllers/Newslatercontroller.js";
import {Router} from "express"
//import { verifyToken } from "../middlewares/veryfytoken.js"


export const NewslaterRouter = Router()

 NewslaterRouter.get("/",getNewslaters)
 NewslaterRouter.get("/:id",getNewslater)
 NewslaterRouter.post("/new", newNewslaters)
 NewslaterRouter.put("/:id/update",updateNewslater)
 NewslaterRouter.delete("/:id/delete" ,deleteNewslater)