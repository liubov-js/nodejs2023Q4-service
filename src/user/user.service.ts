import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.toResponse();
  }

  async create(dto: CreateUserDto) {
    const date = Date.now();
    const user = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    const createdUser = this.userRepository.create(user);

    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    if (Object.keys(dto).length < 2) {
      throw new BadRequestException('Bad request');
    }

    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    if (dto.newPassword === dto.oldPassword) {
      throw new ForbiddenException('You can not write the same password');
    }

    if (updatedUser.password !== dto.oldPassword) {
      throw new ForbiddenException('Wrong current password');
    }

    updatedUser.version += 1;
    updatedUser.password = dto.newPassword;
    updatedUser.updatedAt = Date.now();

    return this.userRepository.save(updatedUser);
  }

  async delete(id: string) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
