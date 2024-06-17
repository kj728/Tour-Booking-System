import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getSpecificUser, signInUser, updateUser } from "../Controllers/userController";
import { isAdminCheck, isPermittedCheck, verifyTokens } from '../Middlewares/verifyTokens';


const authRouter =Router();
authRouter.post("/signup",addUser)
authRouter.get("/allusers",isAdminCheck,getAllUsers)
authRouter.get("/:id",verifyTokens,isPermittedCheck, getSpecificUser)
authRouter.patch("/:id",verifyTokens,isPermittedCheck,updateUser)
authRouter.delete("/:id",isAdminCheck,deleteUser)
authRouter.post("/signin/:id",signInUser)
export default authRouter

