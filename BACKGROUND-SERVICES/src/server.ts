import express, { json } from 'express';
import cron from 'node-cron'
import { sendEmailNewUser } from './Email Service/newUserEmails';
import { sendEmailNewBooking } from './Email Service/newBookingsEmails';


const app = express();
app.use(json());


cron.schedule('*/10 * * * * *', async () => {
    console.log('running a new user task every 10 seconds');
    sendEmailNewUser();
})

cron.schedule('*/20 * * * * *', async () => {
    console.log('running a new booking task every 10 seconds');
    sendEmailNewBooking();
})




const port = 2000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});
