import { Module } from '@nestjs/common';
import { PaymentsService } from './service/payments.service';

@Module({
  providers: [PaymentsService]
})
export class PaymentsModule {}
