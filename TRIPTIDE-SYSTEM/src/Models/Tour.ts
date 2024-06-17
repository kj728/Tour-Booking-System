import { Request } from "express"
export interface ITour{
    id:string,
    tourname:string,
    tdestination:string,
    tdescription:string,
    tprice:number,
    isDeleted:number
}

interface addTour{
    tourname:string,
    tdestination:string,
    tdescription:string,
    tprice:number
}

export interface TourRequest extends Request{
    body: addTour
}
