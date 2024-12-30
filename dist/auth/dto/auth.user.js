"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("../../modules/user/dto/create-user.dto");
class AuthUserDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.AuthUserDto = AuthUserDto;
//# sourceMappingURL=auth.user.js.map