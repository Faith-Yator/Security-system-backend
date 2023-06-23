import { getPopups,getPopup, newPopups, updatePopup,deletePopup } from "../controllers/Popupcontroller.js";
import {Router} from "express"
// import { verifyToken } from "../middlewares/veryfytoken.js"


export const PopupRouter = Router()

 PopupRouter.get("/",getPopups)
 PopupRouter.get("/:id",getPopup)
 PopupRouter.post("/new",newPopups)
 PopupRouter.put("/:id/update",updatePopup)
 PopupRouter.delete("/:id/delete" ,deletePopup)