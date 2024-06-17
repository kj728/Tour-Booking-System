import mssql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'
import { sqlConfig } from '../Config'
import { sendMail } from '../Helpers'
import { error } from 'console'
import ejs from 'ejs'
import { DBHelper } from '../Database Helpers'

const dbInstance = new DBHelper();



dotenv.config({ path: path.resolve(__dirname, "../../.env") })

interface IUser {
    id: string;
    username: string;
    upassword: string;
    uemail: string;
    isAdmin: number,
    isEmailSentNewUser: number,
    isDeleted: number

}

export interface ITour {
    id: string,
    tourname: string,
    tdestination: string,
    tdescription: string,
    tprice: number,
    isDeleted: number
}


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
export async function sendEmailNewBooking() {
    try {
        const bookings = (await dbInstance.query("SELECT * FROM bookings WHERE bEmailsent=0")).recordset as IBooking[]

        console.log(bookings)


        bookings.forEach(async (booking) => {
            const userId = booking.userid

            const user = (await dbInstance.query(`SELECT * FROM users WHERE id='${userId}'`)).recordset[0] as IUser
            console.log(user)

            const tourId = booking.tourid;
            const tour: ITour = (await dbInstance.query(`SELECT * FROM tours WHERE id='${tourId}'`)).recordset[0] as ITour
            console.log(tour);

            let messageOptions = {
                to: user.uemail,
                from: "jameskaromo2@gmail.com",
                subject: "Booking Confirmed",
                html:
                    `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Booking Confirmation - TripTide</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                    color: #333333;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 100vh;
                                }
                                .container {
                                    max-width: 600px;
                                    width: 100%;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                    border-radius: 8px;
                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    overflow: hidden;
                                }
                                .header {
                                    background-color: #007BFF;
                                    color: #ffffff;
                                    padding: 20px;
                                    text-align: center;
                                }
                                .header h1 {
                                    margin: 0;
                                    font-size: 24px;
                                }
                                .content {
                                    padding: 20px;
                                }
                                .content h2 {
                                    color: #007BFF;
                                    font-size: 20px;
                                }
                                .content p {
                                    line-height: 1.6;
                                }
                                .content .booking-details {
                                    background-color: #f4f4f4;
                                    padding: 10px;
                                    border-radius: 5px;
                                    margin-top: 20px;
                                }
                                .content .booking-details p {
                                    margin: 5px 0;
                                }
                                .footer {
                                    background-color: #f4f4f4;
                                    color: #777777;
                                    padding: 20px;
                                    text-align: center;
                                    font-size: 12px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>Booking Confirmation</h1>
                                </div>
                                <div class="content">
                                    <h2>Hello ${user.username},</h2>
                                    <p>Thank you for booking with TripTide! We are excited to help you embark on your next adventure. Here are the details of your booking:</p>
                                    <div class="booking-details">
                                        <p><strong>Booking ID:</strong> ${booking.id}</p>
                                        <p><strong>Destination:</strong>  ${tour.tourname}</p>
                                        <p><strong>Departure Date:</strong>  ${booking.bstartdate}</p>
                                        <p><strong>Return Date:</strong>  ${booking.benddate}</p>
                                        <p><strong>Number of Travelers:</strong>  ${booking.bguests}</p>
                                        <p><strong>Total Cost:</strong>  ${tour.tprice}</p>
                                    </div>
                                    <p>If you have any questions or need further assistance, please don't hesitate to <a href="mailto:support@triptide.com">contact us</a>.</p>
                                </div>
                                <div class="footer">
                                    <p>&copy; 2024 TripTide. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                        </html>

                `
            }

            await sendMail(messageOptions)

          
          
            await dbInstance.query(`UPDATE bookings SET bEmailsent=1 WHERE id='${booking.id}'`)

        })

    } catch (error) {
        console.log(error)
    }

}

