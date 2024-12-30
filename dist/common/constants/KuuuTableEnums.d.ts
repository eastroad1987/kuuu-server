export declare enum KuuuTableEnums {
    BOARD = "boards",
    ARTICLE = "articles",
    ARTICLE_COMMENT = "article_comments",
    USER = "users",
    UPLOAD_FILE = "upload_files"
}
export declare enum BoardEnums {
    ID = "id",
    CREATED_AT = "created_at",
    UPDATED_AT = "updated_at",
    DELETED_AT = "deleted_at",
    BOARD_NAME = "board_name",
    BOARD_TYPE = "board_type",
    ANONYMOUS_YN = "anonymous_yn",
    TITLE_YN = "title_yn",
    CONTENT_YN = "content_yn",
    THUMBNAIL_YN = "thumbnail_yn",
    REFERENCE_PLACE_YN = "reference_place_yn",
    SECRET_YN = "secret_yn",
    IMAGES_YN = "images_yn",
    ATTACH_FILES_YN = "attach_files_yn",
    COMMENT_YN = "comment_yn",
    VIEW_CNT_YN = "view_cnt_yn",
    LIKE_YN = "like_yn"
}
export declare enum ArticleEnums {
    ID = "id",
    CREATED_AT = "created_at",
    UPDATED_AT = "updated_at",
    DELETED_AT = "deleted_at",
    BOARD_ID = "board_id",
    WRITER_ID = "writer_id",
    WRITER_NAME = "writer_name",
    TITLE = "title",
    CONTENT = "content",
    SUMMARY = "summary",
    THUMBNAIL = "thumbnail",
    REFERENCE_PLACE = "reference_place",
    IMAGES = "images",
    ATTACH_FILES = "attach_files",
    VIEW_CNT = "view_cnt"
}
export declare enum ArticleCommentEnums {
    ID = "id",
    CREATED_AT = "created_at",
    UPDATED_AT = "updated_at",
    DELETED_AT = "deleted_at",
    ARTICLE_ID = "article_id",
    WRITER_ID = "writer_id",
    WRITER_NAME = "writer_name",
    COMMENT = "comment",
    FILE_PATH = "file_path"
}
export declare enum UserEnums {
    ID = "id",
    CREATED_AT = "created_at",
    UPDATED_AT = "updated_at",
    DELETED_AT = "deleted_at",
    NAME = "name",
    EMAIL = "email",
    PASSWORD = "password",
    ROLE = "role",
    ACCESS_TOKEN = "access_token",
    REFRESH_TOKEN = "refresh_token",
    DEVICE_TOKEN = "device_token",
    IMAGE_URL = "image_url",
    SNS_ID = "sns_id"
}
export declare enum UploadFileEnums {
    ID = "id",
    CREATED_AT = "created_at",
    UPDATED_AT = "updated_at",
    DELETED_AT = "deleted_at",
    NAME = "name",
    ORIGINAL_NAME = "original_name",
    ENCODING = "encoding",
    MIME_TYPE = "mime_type",
    SIZE = "size",
    URL = "url"
}
