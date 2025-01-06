import { Module } from '@nestjs/common';
import { PaymentsService } from './service/payments.service';
import { PaymentsController } from './controller/payments.controller';

@Module({
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
