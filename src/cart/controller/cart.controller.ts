import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from '../service/cart.service';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';
import { RequestWithUser } from 'src/users/entity/user.interface';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';

@ApiTags("Cart")
@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
    ){}

    @Post('add')
    addItem(@Req() req: RequestWithUser, @Body() createCartItemDto: CreateCartItemDto) {
        const userId = req.user.id;
        return this.cartService.addItem(userId, createCartItemDto);
    }

   @Patch('update/:itemId')
   updateItem(@Req() req: RequestWithUser, @Param('itemId') itemId: number, @Body() updateCartItemDto: UpdateCartItemDto){
        const userId = req.user.id;
        return this.cartService.updateItem(userId, itemId, updateCartItemDto); 
   }
   
   @Delete('delete/:itemId')
   removeItem(@Req() req: RequestWithUser, @Param('itemId') itemId: number){
        const userId = req.user.id;
        return this.cartService.removeItem(userId, itemId);
   }

   @Get('summary')
   getCart(@Req() req: RequestWithUser){
        const userId = req.user.id;
        return this.cartService.getCartSummary(userId);
   }

   @Post('checkout')
   async checkout(@Req() req: RequestWithUser){
        const userId = req.user.id;
        // const cart = await this.cartService.getCartSummary(userId);
        // TODO: integrate the order placement and payment here
        await this.cartService.clearCart(userId);
        return {message: 'Checkout successful.'};
   }
}
