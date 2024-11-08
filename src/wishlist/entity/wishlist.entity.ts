import { Product } from "src/products/entity/product.entity";
import { User } from "src/users/entity/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.wishlist, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Product, product => product.id, { onDelete: 'CASCADE' })
    product: Product;
}