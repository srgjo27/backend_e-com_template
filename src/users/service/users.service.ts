import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Profile } from '../entity/profile.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from 'src/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, role, profile } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
      role: role || Role.USER,
    });

    if (profile) {
      const userProfile = this.profileRepository.create(profile);
      user.profile = await this.profileRepository.save(userProfile);
    }

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['profile'] });
  }

  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id }, relations: ['profile'] });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email }, relations: ['profile'] });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const { username, password, profile } = updateUserDto;

    if (password) {
      updateUserDto.password = await bcrypt.hash(password, 10);
    }

    if (profile) {
      const user = await this.findOneById(id);
      if (user.profile) {
        await this.profileRepository.update(user.profile.id, profile);
      } else {
        const newProfile = this.profileRepository.create(profile);
        user.profile = await this.profileRepository.save(newProfile);
        await this.usersRepository.save(user);
      }
    }

    await this.usersRepository.update(id, { username, ...(password && { password: updateUserDto.password }) });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async removeUser(id: number): Promise<void> {
    const user = await this.findOneById(id);
    
    if (user.role !== Role.SUPER_ADMIN) {
      await this.usersRepository.delete(id);
    } else {
      throw new Error('You are not allowed to delete this user because it is a super admin');
    }  
  }
}