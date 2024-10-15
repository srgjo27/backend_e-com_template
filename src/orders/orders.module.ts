import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { OrdersController } from './controller/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem } from './entity/order.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    forwardRef(() => UsersModule),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
