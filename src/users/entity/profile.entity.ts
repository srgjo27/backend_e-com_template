import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;

    @Column()
    dateOfBirth: Date;

    @OneToOne(() => User, user => user.profile, { onDelete: 'CASCADE' })
    user: User;
}