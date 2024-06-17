import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({path:path.resolve(__dirname,"../../.env")})

//create a configuration object
 let emailConfig = {
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    auth: {
        user:"jameskaromo2@gmail.com",
        pass:  "cewx lwsm ztrr allq"
    },
};

//create a transporter
function createTransporter(config:any){
    return nodemailer.createTransport(config);
}

//send  mail 
export async function sendMail(messageOptions: any) {
    let transporter = createTransporter(emailConfig);

    await transporter.verify();

    await transporter.sendMail(messageOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        console.log(info);
    });

}
