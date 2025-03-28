"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException("Email already exists");
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.userRepository.save(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
        delete user.password;
        return user;
    }
    async login(loginDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
            select: ["id", "email", "password", "role"],
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid credentials");
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
    async refreshToken(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ["id", "email", "role", "refreshToken"],
        });
        if (!user || !user.refreshToken) {
            throw new common_1.UnauthorizedException("Invalid refresh token");
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
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ["id", "email", "name", "role", "imageUrl", "createdAt"],
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ["id", "password"],
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        if (updateUserDto.currentPassword && updateUserDto.newPassword) {
            const isPasswordValid = await bcrypt.compare(updateUserDto.currentPassword, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException("Current password is incorrect");
            }
            const hashedPassword = await bcrypt.hash(updateUserDto.newPassword, 10);
            const updatedFields = Object.assign({}, updateUserDto);
            updatedFields["password"] = hashedPassword;
            updateUserDto = updatedFields;
        }
        delete updateUserDto.currentPassword;
        delete updateUserDto.newPassword;
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }
    async remove(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return this.userRepository.delete(id);
    }
    async logout(id) {
        await this.userRepository.update(id, {
            accessToken: null,
            refreshToken: null,
        });
        return { message: "Logged out successfully" };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map