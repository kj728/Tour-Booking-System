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

export async function sendEmailNewUser() {
    try {
        const users = (await dbInstance.query("SELECT * FROM users WHERE isEmailSentNewUser=0")).recordset as IUser[]

        console.log(users)
      
        users.forEach(async (user) => {
            let messageOptions = {
                to: user.uemail,
                from: "jameskaromo2@gmail.com",
                subject: "Welcome to Triptide",
                html:
                    `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Welcome to TripTide</title>
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
                            .content a {
                                display: inline-block;
                                margin-top: 20px;
                                padding: 10px 20px;
                                background-color: #007BFF;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 5px;
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
                                <h1>Welcome to TripTide!</h1>
                            </div>
                            <div class="content">
                                <h2>Hello ${user.username},</h2>
                                <p>Thank you for registering with TripTide. We are thrilled to have you on board and can't wait to help you explore new destinations. Whether you're looking for a relaxing getaway, an adventure-packed trip, or anything in between, we have something for everyone.</p>
                                <p>As a registered member, you now have access to exclusive deals, personalized recommendations, and a seamless booking experience. Start planning your next trip today!</p>
                                <a href="[Your Website URL]" target="_blank">Explore Now</a>
                            </div>
                            <div class="footer">
                                <p>&copy; 2024 TripTide. All rights reserved.</p>
                                <p>If you have any questions, feel free to <a href="mailto:support@triptide.com">contact us</a>.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            }

            await sendMail(messageOptions)

            await dbInstance.query(`UPDATE users SET isEmailSentNewUser=1 WHERE id='${user.id}'`)

        })

    } catch (error) {
        console.log(error)
    }

}

