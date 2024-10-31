import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entity/product.entity';
import { Category } from './products/entity/category.entity';
import { OrdersModule } from './orders/orders.module';
import { Order, OrderItem } from './orders/entity/order.entity';
import { PaymentsModule } from './payments/payments.module';
import { CartModule } from './cart/cart.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Cart, CartItem } from './cart/entity/cart.entity';
import { WishlistModule } from './wishlist/wishlist.module';
import { Wishlist } from './wishlist/entity/wishlist.entity';
import { Review } from './reviews/entity/review.entity';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [User, Product, Category, Order, OrderItem, Cart, CartItem, Review, Wishlist],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    CartModule,
    ReviewsModule,
    WishlistModule,
    NotificationsModule,
  ],
})
export class AppModule {}
