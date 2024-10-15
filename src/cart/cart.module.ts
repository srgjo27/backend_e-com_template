import { forwardRef, Module } from '@nestjs/common';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';
import { Cart, CartItem } from './entity/cart.entity';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cart, CartItem]),
        forwardRef(() => UsersModule),
        ProductsModule,
    ],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService],
})
export class CartModule {}
