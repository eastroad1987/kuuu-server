"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleCommentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_article_comment_dto_1 = require("./create-article-comment.dto");
class UpdateArticleCommentDto extends (0, swagger_1.PartialType)(create_article_comment_dto_1.CreateArticleCommentDto) {
}
exports.UpdateArticleCommentDto = UpdateArticleCommentDto;
//# sourceMappingURL=update-article-comment.dto.js.map