import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
    private transporter: nodemailer.Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: '',
            }
        });
    }

    async sendOrderConfirmation(email: string, orderId: number){
        const mailOptions = {
            from: '',
            to: email,
            subject: `Konfirmasi Pesanan ${orderId}`,
            text: `Pesanan anda dengan kode pesanan ${orderId} telah kami konfirmasi.`,
        };

        await this.transporter.sendMail(mailOptions);
    }

    async sendShippingUpdate(email: string, orderId: number, status: string){
        const mailOptions = {
            from: '',
            to: email,
            subject: 'Pesanan Update',
            text: `Pesanan anda dengan kode pesanan ${orderId} telah ${status}.`,
        }

        await this.transporter.sendMail(mailOptions);
    }
}
