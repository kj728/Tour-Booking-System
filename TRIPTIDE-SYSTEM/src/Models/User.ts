import { Request } from "express";

export interface IUser{
    id: string;
    username: string;
    upassword: string;
    uemail: string;
    isAdmin:number,
    isEmailSentNewUser:number,
    isDeleted:number
    
   
}

interface addUser{
    username: string;
    uemail: string;
    upassword: string;
   
}

export interface Payload{
    sub: string;
    username: string;
    isAdmin:number,

}

export interface UserRequest extends Request {
    body:addUser;
}