import { getPopups,getPopup, newPopups, updatePopup,deletePopup } from "../controllers/Popupcontroller.js";
import {Router} from "express"
//import { VerifyToken } from "../middlewares/VerifyToken.js"


export const PopupRouter = Router()

 PopupRouter.get("/",getPopups)
 PopupRouter.get("/:id",getPopup)
 PopupRouter.post("/new",newPopups)
 PopupRouter.put("/:id/update",updatePopup)
 PopupRouter.delete("/:id/delete" ,deletePopup)