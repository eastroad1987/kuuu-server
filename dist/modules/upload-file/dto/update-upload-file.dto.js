"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUploadFileDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_upload_file_dto_1 = require("./create-upload-file.dto");
class UpdateUploadFileDto extends (0, mapped_types_1.PartialType)(create_upload_file_dto_1.CreateUploadFileDto) {
}
exports.UpdateUploadFileDto = UpdateUploadFileDto;
//# sourceMappingURL=update-upload-file.dto.js.map