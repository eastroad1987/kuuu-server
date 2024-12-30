"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotExistsException = void 0;
const common_1 = require("@nestjs/common");
class NotExistsException extends common_1.HttpException {
    constructor() {
        super("없습니다.", common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotExistsException = NotExistsException;
//# sourceMappingURL=notExists.js.map