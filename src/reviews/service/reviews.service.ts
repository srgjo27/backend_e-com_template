import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entity/review.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/service/users.service';
import { ProductsService } from 'src/products/service/products.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        private usersService: UsersService,
        private productsService: ProductsService,
    ){}

    async addReview(userId: number, productId: number, createReviewDto: CreateReviewDto): Promise<Review>{
        const user = await this.usersService.findOneById(userId);
        if (!user){
            throw new NotFoundException(`User id ${userId} not found.`);
        }
        const product = await this.productsService.findProductById(productId);
        if (!product){
            throw new NotFoundException(`Product id ${productId} not found.`);
        }

        const review = this.reviewRepository.create({...createReviewDto, user, product});
        return this.reviewRepository.save(review);
    }

    async updateReview(userId: number, reviewId: number, updateReviewDto: UpdateReviewDto): Promise<Review>{
        const review = await this.reviewRepository.findOne({where: {id: reviewId, user: {id : userId}}});
        if (!review){
            throw new NotFoundException('Review not found');
        }
        review.rating = updateReviewDto.rating;
        review.comment = updateReviewDto.comment;
        return this.reviewRepository.save(review);
    }

    async deleteReview(userId: number, reviewId: number): Promise<void>{
        const review = await this.reviewRepository.findOne({where: {id: reviewId, user: {id : userId}}});
        await this.reviewRepository.remove(review);
    }

    async getProductReview(productId: number): Promise<Review[]>{
        return this.reviewRepository.find({where: {product: {id: productId}}, relations: ['users'], });
    }
}
