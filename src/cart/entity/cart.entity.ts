import { Product } from "src/products/entity/product.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User, user => user.carts)
    user: User;

    @ManyToMany(() => CartItem, cartItem => cartItem.cart, {cascade: true})
    items: CartItem[];
}

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Cart, cart => cart.items)
    cart: Cart;

    @ManyToMany(() => Product, product => product.id)
    product: Product;

    @Column('int')
    quantity: number;
}