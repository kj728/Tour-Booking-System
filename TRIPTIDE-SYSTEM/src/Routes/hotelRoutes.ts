import { Router } from "express";
import { addHotel, deleteHotel, getAllHotels, getSpecificHotel, updateHotel } from "../Controllers/hotelControllers";
import { isAdminCheck, verifyTokens } from "../Middlewares/verifyTokens";

const hotelRouter =  Router();
hotelRouter.post("",verifyTokens,isAdminCheck,addHotel)
hotelRouter.get("",getAllHotels)
hotelRouter.get("/:id",verifyTokens,isAdminCheck,getSpecificHotel)
hotelRouter.patch("/:id",verifyTokens,isAdminCheck,updateHotel)
hotelRouter.delete("/:id",verifyTokens,isAdminCheck,deleteHotel)

export default hotelRouter;