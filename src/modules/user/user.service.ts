import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    delete user.password;
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: ["id", "email", "password", "role"],
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });

    await this.userRepository.update(user.id, {
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ["id", "email", "role", "refreshToken"],
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    await this.userRepository.update(user.id, { accessToken });

    return { accessToken };
  }

  async findAll() {
    return this.userRepository.find({
      select: ["id", "email", "name", "role", "imageUrl", "createdAt"],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ["id", "email", "name", "role", "imageUrl", "createdAt"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ["id", "password"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (updateUserDto.currentPassword && updateUserDto.newPassword) {
      const isPasswordValid = await bcrypt.compare(updateUserDto.currentPassword, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException("Current password is incorrect");
      }
      const hashedPassword = await bcrypt.hash(updateUserDto.newPassword, 10);
      const updatedFields = { ...updateUserDto };
      updatedFields["password"] = hashedPassword;
      updateUserDto = updatedFields;
    }

    delete updateUserDto.currentPassword;
    delete updateUserDto.newPassword;

    await this.userRepository.update(id, updateUserDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.userRepository.delete(id);
  }

  async logout(id: number) {
    await this.userRepository.update(id, {
      accessToken: null,
      refreshToken: null,
    });
    return { message: "Logged out successfully" };
  }
}
