
import  { Request } from 'express';

export interface IHotel {
    id: string,
    hotelname: string,
    hotellocation: string,
    hotelrating: number,
    isDeleted:number

}

interface addHotel{
    hotelname: string,
    hotellocation: string,
    hotelrating: number,
}

export interface HotelRequest extends Request {
    body: addHotel
}