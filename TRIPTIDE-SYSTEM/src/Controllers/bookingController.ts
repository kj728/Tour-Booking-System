import { Request, Response, RequestHandler } from "express";
import { BookingSchema } from "../Input Validation/bookingValidation";
import { DBHelper } from "../Database Helpers";
import { BookingRequest, IBooking } from '../Models/Booking';
import { v4 as uid } from 'uuid';
import { CANCELLED } from "dns";



const dbInstance = new DBHelper();

export const addBooking = async (req: BookingRequest, res: Response) => {
    try {
        //generate unique id
        const id = uid();
        //validate input
        const { error } = BookingSchema.validate(req.body)
        if (error) {
            //error message
            return res.status(500).json("Booking input validation failed! " + error)
        }

        //add booking to database
        const { userid, tourid, hotelid, bstartdate, benddate, bookingdate, bguests, bstatus, bEmailSent } = req.body

        await dbInstance.exec("addBooking", { id, userid, tourid, hotelid, bstartdate, benddate, bookingdate, bguests, bstatus, bEmailSent });
        //success message
        return res.status(200).json({ message: "Booking added successfully" });

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }

}

export const getAllBookings: RequestHandler = async (req, res) => {
    try {
        //get all bookings from database
        const bookings = (await dbInstance.exec("getAllBookings", {})).recordset as IBooking[];

        if (bookings.length > 0) {
            //return all bookings
            return res.status(200).json(bookings);
        }
        //if there are no bookings return a message
        return res.status(404).json({ message: "Bookings Not Found" });

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }

}

export const getSpecificBooking = async (req: Request<{ id: string }>, res: Response) => {
    try {
        //get specific booking from database
        const booking = (await dbInstance.exec("getSpecificBooking", { id: req.params.id })).recordset[0] as IBooking

        //check if booking exists
        if (booking && booking.id) {
            //check for soft delete
            if (booking.isDeleted !== 1) {
                //return the booking
                return res.status(200).json(booking)
            } else {
                // has soft delete 
                return res.status(404).json({ message: "Data Deleted!" })

            }



        }
        //if there are no bookings return a message
        return res.status(404).json({ message: "Booking Not Found" })

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }

}

export const updateBooking = async (req: Request<{ id: string }>, res: Response) => {
    try {
        //validate input
        const { error } = BookingSchema.validate(req.body)
        if (error) {
            //error message
            return res.status(500).json("Booking input validation failed! " + error)
        }
        //update booking in database
        const { userid, tourid, hotelid, bstartdate, benddate, bookingdate, bguests, bstatus, bEmailSent } = req.body
        await dbInstance.exec("updateBooking", { id: req.params.id, userid, tourid, hotelid, bstartdate, benddate, bookingdate, bguests, bstatus, bEmailSent });
        //success message
        return res.status(200).json({ message: "Booking updated successfully" });

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }
}

export const deleteBooking = async (req: Request<{ id: string }>, res: Response) => {
    try {
        //get specific booking from database
        const booking = (await dbInstance.exec("getSpecificBooking", { id: req.params.id })).recordset[0] as IBooking

        if (booking && booking.id) {
            //delete booking from database
            await dbInstance.exec("deleteBooking", { id: req.params.id });
            //success message
            return res.status(200).json({ message: "Booking deleted successfully" });


        }
        //if there are no tours return a message
        return res.status(404).json({ message: "Booking Not Found" });

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }
}