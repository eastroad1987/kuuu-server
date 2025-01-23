export enum KuuuTableEnums {
  USER = "users",
  UPLOAD_FILE = "upload_files",
  CATEGORY = "categories",
  SUBCATEGORY = "sub_categories",
  POST = "posts",
  COMMENT = "comments",
}

export enum UserEnums {
  ID = "id",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  DELETED_AT = "deleted_at",
  EMAIL = "email",
  NAME = "name",
  ROLE = "role",
  PASSWORD = "password",
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  DEVICE_TOKEN = "device_token",
  IMAGE_URL = "image_url",
  SNS_ID = "sns_id",
}

export enum UploadFileEnums {
  ID = "id",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  DELETED_AT = "deleted_at",
  NAME = "name",
  ORIGINAL_NAME = "original_name",
  ENCODING = "encoding",
  MIME_TYPE = "mime_type",
  SIZE = "size",
  URL = "url",
}

export enum CategoryEnums {
  ID = "id",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  DELETED_AT = "deleted_at",
  TITLE = "title",
}

export enum SubCategoryEnums {
  ID = "id",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  DELETED_AT = "deleted_at",
  TITLE = "title",
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
  CATEGORY_ID = "category_id",
}

export enum PostEnums {
  ID = "id",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  DELETED_AT = "deleted_at",
  SUMMARY = "summary",
  TITLE = "title",
  CONTENT = "content",
  THUMBNAIL = "thumbnail",
  REFERENCE_PLACE = "reference_place",
  IMAGES = "images",
  ATTACH_FILES = "attach_files",
  AUTHOR_ID = "author_id",
  VIEW_CNT = "view_cnt",
  SUBCATEGORY_ID = "subcategory_id",
  CATEGORY_ID = "category_id",
}

export enum CommentEnums {
  ID = "id",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  DELETED_AT = "deleted_at",
  POST_ID = "post_id",
  AUTHOR_ID = "author_id",
  CONTENT = "content",
  WRITE_NAME = "write_name",
  FILE_PATH = "file_path",
  PARENT_COMMENT_ID = "parent_comment_id",
}
