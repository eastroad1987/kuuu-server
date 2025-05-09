"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentEnums = exports.PostEnums = exports.SubCategoryEnums = exports.CategoryEnums = exports.UploadFileEnums = exports.UserEnums = exports.KuuuTableEnums = void 0;
var KuuuTableEnums;
(function (KuuuTableEnums) {
    KuuuTableEnums["USER"] = "users";
    KuuuTableEnums["UPLOAD_FILE"] = "upload_files";
    KuuuTableEnums["CATEGORY"] = "categories";
    KuuuTableEnums["SUBCATEGORY"] = "sub_categories";
    KuuuTableEnums["POST"] = "posts";
    KuuuTableEnums["COMMENT"] = "comments";
})(KuuuTableEnums || (exports.KuuuTableEnums = KuuuTableEnums = {}));
var UserEnums;
(function (UserEnums) {
    UserEnums["ID"] = "id";
    UserEnums["CREATED_AT"] = "created_at";
    UserEnums["UPDATED_AT"] = "updated_at";
    UserEnums["DELETED_AT"] = "deleted_at";
    UserEnums["EMAIL"] = "email";
    UserEnums["NAME"] = "name";
    UserEnums["ROLE"] = "role";
    UserEnums["PASSWORD"] = "password";
    UserEnums["ACCESS_TOKEN"] = "access_token";
    UserEnums["REFRESH_TOKEN"] = "refresh_token";
    UserEnums["DEVICE_TOKEN"] = "device_token";
    UserEnums["IMAGE_URL"] = "image_url";
    UserEnums["SNS_ID"] = "sns_id";
})(UserEnums || (exports.UserEnums = UserEnums = {}));
var UploadFileEnums;
(function (UploadFileEnums) {
    UploadFileEnums["ID"] = "id";
    UploadFileEnums["CREATED_AT"] = "created_at";
    UploadFileEnums["UPDATED_AT"] = "updated_at";
    UploadFileEnums["DELETED_AT"] = "deleted_at";
    UploadFileEnums["NAME"] = "name";
    UploadFileEnums["ORIGINAL_NAME"] = "original_name";
    UploadFileEnums["ENCODING"] = "encoding";
    UploadFileEnums["MIME_TYPE"] = "mime_type";
    UploadFileEnums["SIZE"] = "size";
    UploadFileEnums["URL"] = "url";
})(UploadFileEnums || (exports.UploadFileEnums = UploadFileEnums = {}));
var CategoryEnums;
(function (CategoryEnums) {
    CategoryEnums["ID"] = "id";
    CategoryEnums["CREATED_AT"] = "created_at";
    CategoryEnums["UPDATED_AT"] = "updated_at";
    CategoryEnums["DELETED_AT"] = "deleted_at";
    CategoryEnums["TITLE"] = "title";
})(CategoryEnums || (exports.CategoryEnums = CategoryEnums = {}));
var SubCategoryEnums;
(function (SubCategoryEnums) {
    SubCategoryEnums["ID"] = "id";
    SubCategoryEnums["CREATED_AT"] = "created_at";
    SubCategoryEnums["UPDATED_AT"] = "updated_at";
    SubCategoryEnums["DELETED_AT"] = "deleted_at";
    SubCategoryEnums["TITLE"] = "title";
    SubCategoryEnums["ANONYMOUS_YN"] = "anonymous_yn";
    SubCategoryEnums["TITLE_YN"] = "title_yn";
    SubCategoryEnums["CONTENT_YN"] = "content_yn";
    SubCategoryEnums["THUMBNAIL_YN"] = "thumbnail_yn";
    SubCategoryEnums["REFERENCE_PLACE_YN"] = "reference_place_yn";
    SubCategoryEnums["SECRET_YN"] = "secret_yn";
    SubCategoryEnums["IMAGES_YN"] = "images_yn";
    SubCategoryEnums["ATTACH_FILES_YN"] = "attach_files_yn";
    SubCategoryEnums["COMMENT_YN"] = "comment_yn";
    SubCategoryEnums["VIEW_CNT_YN"] = "view_cnt_yn";
    SubCategoryEnums["CATEGORY_ID"] = "category_id";
})(SubCategoryEnums || (exports.SubCategoryEnums = SubCategoryEnums = {}));
var PostEnums;
(function (PostEnums) {
    PostEnums["ID"] = "id";
    PostEnums["CREATED_AT"] = "created_at";
    PostEnums["UPDATED_AT"] = "updated_at";
    PostEnums["DELETED_AT"] = "deleted_at";
    PostEnums["SUMMARY"] = "summary";
    PostEnums["TITLE"] = "title";
    PostEnums["CONTENT"] = "content";
    PostEnums["THUMBNAIL"] = "thumbnail";
    PostEnums["REFERENCE_PLACE"] = "reference_place";
    PostEnums["IMAGES"] = "images";
    PostEnums["ATTACH_FILES"] = "attach_files";
    PostEnums["AUTHOR_ID"] = "author_id";
    PostEnums["VIEW_CNT"] = "view_cnt";
    PostEnums["SUBCATEGORY_ID"] = "subcategory_id";
    PostEnums["CATEGORY_ID"] = "category_id";
})(PostEnums || (exports.PostEnums = PostEnums = {}));
var CommentEnums;
(function (CommentEnums) {
    CommentEnums["ID"] = "id";
    CommentEnums["CREATED_AT"] = "created_at";
    CommentEnums["UPDATED_AT"] = "updated_at";
    CommentEnums["DELETED_AT"] = "deleted_at";
    CommentEnums["POST_ID"] = "post_id";
    CommentEnums["AUTHOR_ID"] = "author_id";
    CommentEnums["CONTENT"] = "content";
    CommentEnums["WRITE_NAME"] = "write_name";
    CommentEnums["FILE_PATH"] = "file_path";
    CommentEnums["PARENT_COMMENT_ID"] = "parent_comment_id";
})(CommentEnums || (exports.CommentEnums = CommentEnums = {}));
//# sourceMappingURL=KuuuTableEnums.js.map