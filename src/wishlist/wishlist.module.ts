import { forwardRef, Module } from '@nestjs/common';
import { WishlistService } from './service/wishlist.service';
import { WishlistController } from './controller/wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entity/wishlist.entity';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    ProductsModule,
    forwardRef(() => UsersModule),
    
  ],
  providers: [WishlistService],
  controllers: [WishlistController],
  exports: [WishlistService],
})
export class WishlistModule {}
