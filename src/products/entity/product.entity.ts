import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Review } from 'src/reviews/entity/review.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  sku: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];
}