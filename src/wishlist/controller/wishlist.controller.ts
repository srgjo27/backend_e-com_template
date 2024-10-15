import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { WishlistService } from '../service/wishlist.service';
import { RequestWithUser } from 'src/users/entity/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
    constructor(
        private readonly wishlistService: WishlistService,
    ){}

    @Post(':productId')
    addToWishlist(@Req() req: RequestWithUser, @Param('productId') productId: number){
        const user = req.user.id;
        return this.wishlistService.addToWishlist(user, productId);
    }

    @Delete('remove/:productId')
    removeFromWishlist(@Req() req: RequestWithUser, @Param('productId') productId: number){
        const user = req.user.id;
        return this.wishlistService.removeFromWishlist(user, productId);
    }

    @Get()
    viewWishlist(@Req() req: RequestWithUser){
        const user = req.user.id;
        return this.wishlistService.viewWishlist(user);
    }
}
