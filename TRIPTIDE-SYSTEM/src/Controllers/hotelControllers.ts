import { Request, Response, RequestHandler } from "express";
import { v4 as uid } from 'uuid';
import { HotelRequest, IHotel } from "../Models/Hotel";

import { DBHelper } from "../Database Helpers";
import { HotelSchema } from "../Input Validation/hotelValidation";

const dbInstance = new DBHelper();

export const addHotel = async (req: HotelRequest, res: Response) => {
    try {
        //generate unique id
        const id = uid();

        const { error } = HotelSchema.validate(req.body);

        if (error) {
            //error message
            return res.status(500).json("Hotel input validation failed! " + error)
        }
        

        // get data from the request
        const { hotelname, hotellocation, hotelrating } = req.body
        //excecute the stored procedure
        await dbInstance.exec("addHotel", { id, hotelname, hotellocation, hotelrating })
        //success message
        return res.status(200).json({ message: "Hotel added successfully" });
    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }
}


export const getAllHotels: RequestHandler = async (req, res) => {
    try {
        //get the hotels from the database
        const hotels = (await dbInstance.exec("getAllHotels", {})).recordset as IHotel[]
        //check if there are hotels
        if (hotels.length > 0) {
            //return the hotels
            return res.status(200).json(hotels);
        }
        //if there are no hotels return a message
        return res.status(404).json({ message: "Hotels Not Found" });

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }
}

export const getSpecificHotel = async (req: Request<{ id: string }>, res: Response) => {

    try {
        //get the specific hotel
        const hotel = (await dbInstance.exec("getSpecificHotel", { id: req.params.id })).recordset[0] as IHotel

        //check if the hotel exists
        if (hotel && hotel.id) {
            //check for soft delete
            if (hotel.isDeleted !== 1) {
                //return the hotel
                return res.status(200).json(hotel)
            } else {
                // has soft delete 
                return res.status(404).json({ message: "Data Deleted!" })
            }


        }
        //error message
        return res.status(404).json({ message: "Hotel Not Found" });

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }

}

export const updateHotel = async (req: Request<{ id: string }>, res: Response) => {

    try {
        //get the hotel from the database
        const hotel = (await dbInstance.exec("getSpecificHotel", { id: req.params.id })).recordset[0] as IHotel;
        //check if the hotel exists
        if (hotel && hotel.id) {
            //validate the hotel information
            const { error } = HotelSchema.validate(req.body);
            if (error) {
                //error message
                return res.status(500).json("Hotel input validation failed! " + error)
            }
            const { hotelname, hotellocation, hotelrating } = req.body;
            //update the hotel with new information
            await dbInstance.exec("updateHotel", { id: req.params.id, hotelname, hotellocation, hotelrating })
            //sucess message
            return res.status(200).json({ message: "Hotel updated successfully" });
        }
        //error message
        return res.status(404).json({ message: "Hotel Not Found" });
    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }

}

export const deleteHotel = async (req: Request<{ id: string }>, res: Response) => {
    try {
        //get the hotel from the database
        const hotel = (await dbInstance.exec("getSpecificHotel", { id: req.params.id })).recordset[0] as IHotel;
        //check if the hotel exists
        if (hotel && hotel.id) {
            //proceed to delete the hotel
            await dbInstance.exec("deleteHotel", { id: req.params.id })
            //sucess message
            return res.status(200).json({ message: "Hotel deleted successfully" });
        }
        //error message
        return res.status(404).json({ message: "Hotel Not Found" });
    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }
}

