import { Router } from "express";
import { addTour, deleteTour, getAllTours, getSpecificTour, updateTour } from "../Controllers/tourController";
import { isAdminCheck, verifyTokens } from "../Middlewares/verifyTokens";

const tourRouter = Router();
tourRouter.post("",verifyTokens,isAdminCheck,addTour)
tourRouter.get("",getAllTours)
tourRouter.get("/:id",verifyTokens,isAdminCheck,getSpecificTour)
tourRouter.patch("/:id",verifyTokens,isAdminCheck,updateTour)
tourRouter.delete("/:id",verifyTokens,isAdminCheck,deleteTour)

export default tourRouter;