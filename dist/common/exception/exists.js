"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistsException = void 0;
const common_1 = require("@nestjs/common");
class ExistsException extends common_1.HttpException {
    constructor() {
        super("이미 있습니다.", common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ExistsException = ExistsException;
//# sourceMappingURL=exists.js.map