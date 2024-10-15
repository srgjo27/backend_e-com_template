import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './service/reviews.service';
import { ReviewsController } from './controller/reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    ProductsModule,
    forwardRef(() => UsersModule),
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}
