import { Injectable } from '@nestjs/common';
import * as midtransClient from 'midtrans-client';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PaymentsService {
  private snap: midtransClient.Snap;

  constructor() {
    this.snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
  }

  async createTransaction(orderId: string, grossAmount: number) {
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      credit_card: {
        secure: true,
      },
    };

    try {
      const transaction = await this.snap.createTransaction(parameter);
      return transaction;
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }
}
