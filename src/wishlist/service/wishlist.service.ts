import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from '../entity/wishlist.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/service/users.service';
import { ProductsService } from 'src/products/service/products.service';

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(Wishlist)
        private wishlistRepository: Repository<Wishlist>,

        private usersService: UsersService,
        private productsService: ProductsService,
    ){}

    async addToWishlist(userId: number, productId: number): Promise<Wishlist>{
        const user = await this.usersService.findOneById(userId);
        const product = await this.productsService.findProductById(productId);
        const wishlistItem = this.wishlistRepository.create({user, product});
        return this.wishlistRepository.save(wishlistItem);
    }

    async removeFromWishlist(userId: number, productId: number): Promise<void>{
        const wishlistItem = await this.wishlistRepository.findOne({where: { user: {id: userId}, product: {id: productId}}});
        await this.wishlistRepository.remove(wishlistItem);
    }

    async viewWishlist(userId: number): Promise<Wishlist[]>{
        return this.wishlistRepository.find({where: {user: {id: userId}}, relations: ['product']})
    }
}
