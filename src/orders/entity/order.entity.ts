import { Product } from "src/products/entity/product.entity";
import { User } from "src/users/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    status: string; // 'placed', 'shipped', 'delivered', 'cancelled', 'returned'

    @Column('decimal')
    total: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, {cascade: true})
    items: OrderItem[];
}

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.items)
    order: Order;

    @ManyToOne(() => Product, product => product.id)
    product: Product;

    @Column('int')
    quantity: number;

    @Column('decimal')
    price: number;
}