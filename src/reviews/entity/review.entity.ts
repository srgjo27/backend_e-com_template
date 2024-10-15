import { Product } from "src/products/entity/product.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @ManyToOne(() => User, user => user.reviews)
    user: User;

    @ManyToOne(() => Product, product => product.reviews)
    product: Product;
}