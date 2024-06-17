import{Router} from 'express'
import { addBooking, deleteBooking, getAllBookings, getSpecificBooking, updateBooking } from '../Controllers/bookingController';
import { isAdminCheck, isPermittedCheck, verifyTokens } from '../Middlewares/verifyTokens';

const bookingRouter =Router();
bookingRouter.get("",verifyTokens,isAdminCheck,getAllBookings)
bookingRouter.post("",addBooking)
bookingRouter.get("/:id",verifyTokens,isPermittedCheck,getSpecificBooking)
bookingRouter.patch("/:id",verifyTokens,isPermittedCheck,updateBooking)
bookingRouter.delete("/:id",verifyTokens,isPermittedCheck,deleteBooking)



export default bookingRouter;