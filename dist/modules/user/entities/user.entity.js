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
const class_transformer_1 = require("class-transformer");
const KuuuTableEnums_1 = require("../../../common/constants/KuuuTableEnums");
const base_entity_1 = require("../../../common/entity/base.entity");
const typeorm_1 = require("typeorm");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User extends base_entity_1.BaseModel {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.EMAIL,
        nullable: true,
        comment: "이메일",
        length: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.NAME,
        nullable: true,
        comment: "이름",
        length: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.PASSWORD,
        nullable: true,
        comment: "비밀번호",
        length: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.ACCESS_TOKEN,
        nullable: true,
        comment: "accessToken",
        length: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.REFRESH_TOKEN,
        nullable: true,
        comment: "refreshToken",
        length: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.DEVICE_TOKEN,
        nullable: true,
        comment: "deviceToken",
        length: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "deviceToken", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.IMAGE_URL,
        nullable: true,
        comment: "이미지 url",
        length: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: KuuuTableEnums_1.UserEnums.SNS_ID,
        nullable: true,
        comment: "snsId",
        length: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "snsId", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(KuuuTableEnums_1.KuuuTableEnums.USER)
], User);
//# sourceMappingURL=user.entity.js.map