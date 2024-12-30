import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserRole } from "./entities/user.entity";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createByAdmin(user: User, createUserDto: CreateUserDto) {
    if (user.role !== UserRole.ADMIN) {
      throw new HttpException("어드민 유저만 생성이 가능합니다.", HttpStatus.BAD_REQUEST);
    }
    return await this.usersRepository.save(createUserDto);
  }
  async updateByAdmin(user: User, updateUserDto: UpdateUserDto) {
    console.log("[updateByAdmin] updateUserDto : ", updateUserDto);
    return await this.usersRepository.update(updateUserDto.id, updateUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async findEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneColumn(column: string, value: string | number): Promise<User> {
    return this.usersRepository.findOne({ [column]: value });
  }
}
