import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from '../service/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create')
  async createTransaction(@Body() createPaymentDto: { orderId: string; grossAmount: number }) {
    return this.paymentsService.createTransaction(createPaymentDto.orderId, createPaymentDto.grossAmount);
  }
}
