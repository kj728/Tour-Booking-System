import mssql from 'mssql'
import { Request, Response, RequestHandler } from 'express';
import { sqlConfig } from '../Config'
import { DBHelper } from '../Database Helpers'
import { IUser, Payload, UserRequest } from '../Models/User';
import { v4 as uid } from 'uuid';
import { RegisterSchema } from '../Input Validation/userValidaton';

import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

const dbInstance = new DBHelper();
export const addUser = async (req: UserRequest, res: Response) => {
    try {
        //generate unique id
        const id = uid();
        // get input data
        const { username, uemail, upassword } = req.body
        //validate the input data
        const { error } = RegisterSchema.validate(req.body)
        if (error) {
            //error message
            return res.status(500).json("User input validation failed! " + error)
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(upassword, 10)
        //add the user to the database
        await dbInstance.exec("addUser", { id, uemail, username, upassword: hashedPassword })
        //success message
        return res.status(200).json({ message: "User Added Successfully" })

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error });
    }
}

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        //get all users from the database
        const users = (await dbInstance.exec("getAllUsers", {})).recordset as IUser[];
        //check if there are users
        if (users.length > 0) {

            //return the users
            return res.status(200).json(users)
        }
        //if there are no users return a message
        return res.status(404).json({ message: "Users Not Found" })

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error })
    }
}

export const getSpecificUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        //get user information from the database
        const user: IUser = (await dbInstance.exec("getSpecificUser", { id: req.params.id })).recordset[0] as IUser
        //check if user exists
        if (user && user.id) {
            //check for soft delete
            if (user.isDeleted !== 1) {
                //return the user
                return res.status(200).json(user)
            } else {
                // has soft delete 
                return res.status(404).json({ message: "Data Deleted!" })
            }

        }
        //error message
        return res.status(404).json({ message: "User Not Found" })

    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error })
    }
}
export const updateUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        //get user information from the database
        const user = (await dbInstance.exec("getSpecificUser", { id: req.params.id })).recordset[0] as IUser;
        //check if user exists
        if (user && user.id) {
            //validate input parameters
            const { error } = RegisterSchema.validate(req.body)
            if (error) {
                return res.status(500).json("User input validation failed! " + error)
            }
            //update user information in the database
            const { username, uemail, upassword } = req.body
            const hashedPassword = await bcrypt.hash(upassword, 10)
            await dbInstance.exec("updateUser", { id: req.params.id, uemail, username, upassword: hashedPassword })
            //success message
            return res.status(200).json({ message: "User Updated Successfully" })
        }
        //error message
        return res.status(404).json({ message: "User Not Found" })
    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error })
    }
}


export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        //get user information from the database
        const user = (await dbInstance.exec("getSpecificUser", { id: req.params.id })).recordset[0] as IUser;
        //check if user exists
        if (user && user.id) {
            //proceed to delete user
            await dbInstance.exec("deleteUser", { id: req.params.id })
            //success message
            return res.status(200).json({ message: "User Deleted Successfully" })
        }
        //error message
        return res.status(404).json({ message: "User Not Found" })
    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error })
    }
}

export const signInUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        //get data from the user
        const { username, upassword } = req.body
        //get user information from the database
        const user = (await dbInstance.exec("getSpecificUser", { id: req.params.id })).recordset[0] as IUser;
        //check if user exists
        if (user && user.id) {

            if (user.isDeleted != 1) {
                //check if password is valid
                const isPassValid = await bcrypt.compare(upassword, user.upassword);
                if (isPassValid) {
                    //store user info in payload
                    const payload: Payload = {
                        sub: user.id,
                        username: user.username,
                        isAdmin: user.isAdmin
                    }
                    //generate token for the user
                    const token = Jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: "2d" });
                    //success message
                    return res.status(200).json({ message: "User Logged In Successfully", token })
                }

            } else {
                //has soft delete
                return res.status(404).json({ message: "Data Deleted!" })

            }


            //error message
            return res.status(404).json({ message: "User Not Found" })
        }
    } catch (error) {
        //error message
        return res.status(500).json({ message: "Something went wrong " + error })
    }

}

