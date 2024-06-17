import { Request } from "express";

export interface IBooking {
    id: string,
    userid: string,
    tourid: string,
    hotelid: string,
    bstartdate: string,
    benddate: string,
    bookingdate: string,
    bguests: number,
    bstatus: string,
    bEmailSent: string,
    isDeleted: number,
}

interface addBooking {
    userid: string,
    tourid: string,
    hotelid: string,
    bstartdate: string,
    benddate: string,
    bookingdate: string,
    bguests: number,
    bstatus: string,
    bEmailSent: number,

}

export interface BookingRequest extends Request {
    body: addBooking
}