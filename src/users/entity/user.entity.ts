import { Cart } from 'src/cart/entity/cart.entity';
import { Order } from 'src/orders/entity/order.entity';
import { Review } from 'src/reviews/entity/review.entity';
import { Wishlist } from 'src/wishlist/entity/wishlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { Role } from 'src/enums/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    enum: Role,
    default: Role.USER,
  })
  role: Role; 

  @OneToOne(() => Profile, profile => profile.user, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Order, order => order.user, { onDelete: 'CASCADE' })
  orders: Order[];

  @ManyToMany(() => Cart, cart => cart.user)
  carts: Cart[];

  @OneToMany(() => Review, review => review.user, { onDelete: 'CASCADE' })
  reviews: Review[];

  @OneToMany(() => Wishlist, wishlist => wishlist.user, { onDelete: 'CASCADE' })
  wishlist: Wishlist[];
}