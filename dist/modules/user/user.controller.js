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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const base_controller_1 = require("../../common/controller/base.controller");
const jwt_auth_guard_1 = require("../../auth/strategy/jwt-auth.guard");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_decorator_1 = require("../../common/decorator/user.decorator");
const user_entity_1 = require("./entities/user.entity");
let UserController = class UserController extends base_controller_1.BaseController {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    async createByAdmin(createUserDto, user) {
        await this.userService.createByAdmin(user, createUserDto);
    }
    async updateByAdmin(updateUserDto, user) {
        await this.userService.updateByAdmin(user, updateUserDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("admin"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createByAdmin", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)("admin"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateByAdmin", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)("[사용자] 블로그 유저"),
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map