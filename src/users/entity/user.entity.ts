import { Cart } from 'src/cart/entity/cart.entity';
import { Order } from 'src/orders/entity/order.entity';
import { Review } from 'src/reviews/entity/review.entity';
import { Wishlist } from 'src/wishlist/entity/wishlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string; 

  @Column({ default: '' })
  profile: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @ManyToMany(() => Cart, cart => cart.user)
  carts: Cart[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => Wishlist, wishlist => wishlist.user)
  wishlist: Wishlist[];
}