import { Request,Response,RequestHandler } from "express";
import { ITour, TourRequest } from "../Models/Tour";
import { v4 as uid } from 'uuid';
import { TourSchema } from "../Input Validation/tourValidation";

import { DBHelper } from "../Database Helpers";

const dbInstance =new DBHelper();

export const addTour= async (req:TourRequest,res:Response) => {
    try {
        //generate unique id
        const id = uid();
        //validate the input
        const {error} =TourSchema.validate(req.body)
        if (error){
            return res.status(500).json("Tour input validation failed! "+error)
        }
        // get data from the request
        const {tourname,tdestination,tdescription,tprice} =req.body
        //excecute the stored procedure
        await dbInstance.exec("addTour",{id,tourname,tdestination,tdescription,tprice})
        //success message
        return res.status(200).json({message:"Tour added successfully"})
    } catch (error) {
        //error message
        return res.status(500).json({message:"Something went wrong "+error})
    }

}

export const getAllTours:RequestHandler = async(req,res)=>{
    try {
        //get all the tours from the database
        const tours = (await dbInstance.exec("getAllTours",{})).recordset as ITour[]

        if(tours.length > 0) {
            //return the tours
            return res.status(200).json(tours)
        }
        //if there are no tours return a message
        return res.status(404).json({message:"Tours Not Found"})
        
    } catch (error) {
        //error message
        return res.status(500).json({message:"Something went wrong "+error})
        
    }

}

export const getSpecificTour = async (req:Request<{id:string}>, res:Response) => {

    try {
        //get the specific tour from the database
        const tour =(await dbInstance.exec("getSpecificTour",{id:req.params.id})).recordset[0] as ITour
        //check if the tour exists
        if(tour && tour.id){
            //check for soft delete
            if (tour.isDeleted !== 1) {
                //return the tour
                return res.status(200).json(tour)
            } else {
                // has soft delete 
                return res.status(404).json({ message: "Data Deleted!" })
            }


            //return the tour
            return res.status(200).json(tour)
        }
        //if there are no tours return a message
        return res.status(404).json({message:"Tour Not Found"})
        
    } catch (error) {
          //error message
          return res.status(500).json({message:"Something went wrong "+error})
        
    }

}

export const updateTour = async(req:Request<{id:string}>, res:Response) => {
    try {
        //get the tour from the database
        const tour = (await dbInstance.exec("getSpecificTour", {id:req.params.id})).recordset[0] as ITour;
        //check if tour exists
        if(tour && tour.id){
            //validate the input
            const {error} = TourSchema.validate(req.body)
            if (error){
                //error message
                return res.status(500).json("Tour input validation failed! "+error)
            }
            const {tourname,tdestination,tdescription,tprice} =req.body
            //excecute the stored procedure
            await dbInstance.exec("updateTour",{id:req.params.id,tourname,tdestination,tdescription,tprice})
            //success message
            return res.status(200).json({message:"Tour updated successfully"})
        }
        //if there are no tours return a message
        return res.status(404).json({message:"Tour Not Found"})
    } catch (error) {
        //error message
        return res.status(500).json({message:"Something went wrong "+error})
        
    }
}

export const deleteTour = async(req:Request<{id:string}>,res:Response) => {
    try {
        //get the tour from the database
        const tour = (await dbInstance.exec("getSpecificTour",{id:req.params.id})).recordset[0] as ITour;

        //check if the tour exists
        if (tour && tour.id) {
            await dbInstance.exec("deleteTour",{id:req.params.id})
            //success message
            return res.status(200).json({message:"Tour deleted successfully"})
        }
        //if there are no tours return a message
        return res.status(404).json({message:"Tour Not Found"})
        
    } catch (error) {
        //error message
        return res.status(500).json({message:"Something went wrong "+error})
        
    }

}