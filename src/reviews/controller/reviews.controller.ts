import { Body, Controller, Delete, Param, Patch, Post, Req } from '@nestjs/common';
import { ReviewsService } from '../service/reviews.service';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/users/entity/user.interface';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@ApiTags('Review')
@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly reviewsService: ReviewsService,
    ){}

    @Post('add/:productId')
    addReview(@Req() req: RequestWithUser, @Param('productId') productId: number, @Body() createReviewDto: CreateReviewDto){
        const userId = req.user.id;
        return this.reviewsService.addReview(userId, productId, createReviewDto);
    }

    @Patch('update/:reviewId')
    updateReview(@Req() req: RequestWithUser, @Param('reviewId') reviewId: number, @Body() updateReviewDto: UpdateReviewDto){
        const userId = req.user.id;
        return this.reviewsService.updateReview(userId, reviewId, updateReviewDto);
    }

    @Delete('delete/:reviewId')
    deleteReview(@Req() req: RequestWithUser, @Param('reviewId') reviewId: number){
        const userId = req.user.id;
        return this.reviewsService.deleteReview(userId, reviewId);
    }
}
