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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const KuuuTableEnums_1 = require("../../../common/constants/KuuuTableEnums");
const base_entity_1 = require("../../../common/entity/base.entity");
const typeorm_1 = require("typeorm");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User extends base_entity_1.BaseModel {
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.EMAIL,
        length: 255,
        nullable: false,
        unique: true,
        comment: "이메일",
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.NAME,
        length: 255,
        nullable: false,
        comment: "이름",
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: KuuuTableEnums_1.UserEnums.ROLE,
        enum: UserRole,
        default: UserRole.USER,
        comment: "역할",
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.PASSWORD,
        length: 255,
        nullable: false,
        comment: "비밀번호",
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("text", {
        name: KuuuTableEnums_1.UserEnums.ACCESS_TOKEN,
        nullable: true,
        comment: "액세스 토큰",
    }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)("text", {
        name: KuuuTableEnums_1.UserEnums.REFRESH_TOKEN,
        nullable: true,
        comment: "리프레시 토큰",
    }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.DEVICE_TOKEN,
        length: 255,
        nullable: true,
        comment: "디바이스 토큰",
    }),
    __metadata("design:type", String)
], User.prototype, "deviceToken", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.IMAGE_URL,
        length: 255,
        nullable: true,
        comment: "프로필 이미지 URL",
    }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.SNS_ID,
        length: 255,
        nullable: true,
        comment: "SNS ID",
    }),
    __metadata("design:type", String)
], User.prototype, "snsId", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(KuuuTableEnums_1.KuuuTableEnums.USER)
], User);
//# sourceMappingURL=user.entity.js.map