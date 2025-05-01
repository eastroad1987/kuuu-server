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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcryptjs_1 = require("bcryptjs");
const transactional_repository_1 = require("./../common/unit-of-work/transactional.repository");
const unit_of_work_provider_1 = require("./../common/unit-of-work/unit-of-work.provider");
const user_entity_1 = require("../modules/user/entities/user.entity");
const user_service_1 = require("../modules/user/user.service");
const typeorm_2 = require("typeorm");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService, configService, uow, repository, userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.uow = uow;
        this.repository = repository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async loginAdmin(authDto) {
        console.log("[loginAdmin] authDto : ", authDto);
        const user = await this.userRepository.findOne({ where: { email: authDto.email } });
        if (!user) {
            throw new common_1.HttpException("아이디 패스워드를 확인해주세요", common_1.HttpStatus.BAD_REQUEST);
        }
        let token;
        await this.uow.withTransaction(async () => {
            await this.verifyPassword(authDto.password, user);
            token = await this.generateAccessRefreshToken(user);
        });
        return token;
    }
    async signup(user) {
        const currentUser = await this.userRepository.findOne({ where: { email: user.email } });
        if (currentUser) {
            throw new common_1.HttpException("이미 등록된 이메일입니다.", common_1.HttpStatus.BAD_REQUEST);
        }
        user.password = await this.toHashed(user.password);
        return this.saveTransactionUser(user);
    }
    async saveTransactionUser(user) {
        let token;
        await this.uow.withTransaction(async () => {
            const createUser = await this.repository.getRepository(user_entity_1.User).create(user);
            const entity = Object.assign({}, createUser);
            const savedUser = await this.repository.getRepository(user_entity_1.User).save(entity);
            token = await this.generateAccessRefreshToken(savedUser);
        });
        return token;
    }
    async generateAccessRefreshToken(user) {
        const tokens = await this.getTokens(user.id, user.email);
        const hashedRefreshToken = await this.toHashed(tokens.refreshToken);
        await this.repository.getRepository(user_entity_1.User).update(user.id, { refreshToken: hashedRefreshToken });
        return tokens;
    }
    async checkExistUserByOauth(req) {
        const currentUser = await this.userService.findOne(req.user.name);
        return currentUser;
    }
    async verifyPassword(plainTextPassword, user) {
        const isPasswordMatch = await (0, bcryptjs_1.compare)(plainTextPassword, user.password);
        if (!isPasswordMatch) {
            await this.userService.update(user.id, user);
            throw new common_1.HttpException("비밀번호가 일치하지 않습니다!!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async toHashed(plainTextPassword) {
        const saltOrRounds = 10;
        return await (0, bcryptjs_1.hash)(plainTextPassword, saltOrRounds);
    }
    async getTokens(userId, email) {
        const jwtPayload = {
            id: userId,
            email: email,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign(jwtPayload, {
                secret: this.configService.get("JWT_ACCESS"),
                expiresIn: "7d",
            }),
            this.jwtService.sign(jwtPayload, {
                secret: this.configService.get("JWT_REFRESH"),
                expiresIn: "7d",
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async getAccessToken(userId, email) {
        const jwtPayload = {
            id: userId,
            email: email,
        };
        return this.jwtService.sign(jwtPayload, {
            secret: this.configService.get("JWT_ACCESS"),
            expiresIn: "12h",
        });
    }
    async getUserIfRefreshTokenMatches(refreshToken, id) {
        const user = await this.userService.findOne(id);
        const isRefreshTokenMatching = (0, bcryptjs_1.compare)(refreshToken, user.refreshToken);
        if (isRefreshTokenMatching) {
            return user;
        }
    }
    async removeRefreshToken(user) {
        console.log("[removeRefreshToken] user : ", user);
        return;
    }
    async refreshToken(id, refreshToken) {
        const user = await this.userService.findOne(id);
        if (!user)
            throw new common_1.HttpException("인증실패.", common_1.HttpStatus.UNAUTHORIZED);
        const storeRefreshToken = user.refreshToken;
        const refreshTokenMatches = await (0, bcryptjs_1.compare)(refreshToken, storeRefreshToken);
        if (!refreshTokenMatches)
            throw new common_1.HttpException("인증실패.", common_1.HttpStatus.UNAUTHORIZED);
        const accessToken = await this.getAccessToken(user.id, user.email);
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService,
        unit_of_work_provider_1.UnitOfWork,
        transactional_repository_1.TransactionalRepository,
        typeorm_2.Repository])
], AuthService);
