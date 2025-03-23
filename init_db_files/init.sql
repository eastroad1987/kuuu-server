-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS kuuu_db
    CHARACTER SET = 'utf8mb4'
    COLLATE = 'utf8mb4_unicode_ci';

USE kuuu_db;

-- 1. categories 테이블 생성
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. subcategories 테이블 생성
CREATE TABLE IF NOT EXISTS sub_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    title VARCHAR(255),
    anonymous_yn ENUM('Y', 'N'),
    title_yn ENUM('Y', 'N'),
    content_yn ENUM('Y', 'N'),
    thumbnail_yn ENUM('Y', 'N'),
    reference_place_yn ENUM('Y', 'N'),
    secret_yn ENUM('Y', 'N'),
    images_yn ENUM('Y', 'N'),
    attach_files_yn ENUM('Y', 'N'),
    comment_yn ENUM('Y', 'N'),
    view_cnt_yn ENUM('Y', 'N'),
    category_id BIGINT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. posts 테이블 생성
CREATE TABLE IF NOT EXISTS posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    summary TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    thumbnail VARCHAR(255),
    reference_place VARCHAR(255),
    images TEXT,
    attach_files TEXT,
    author_id BIGINT NOT NULL,
    view_cnt INT DEFAULT 0,
    subcategory_id BIGINT,
    category_id BIGINT NOT NULL,
    FOREIGN KEY (subcategory_id) REFERENCES subcategories (id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. comments 테이블 생성
CREATE TABLE IF NOT EXISTS comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    post_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    write_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255),
    parent_comment_id BIGINT DEFAULT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES comments (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- uploadfiles 테이블 생성
CREATE TABLE IF NOT EXISTS upload_files (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    name TEXT NULL,
    original_name TEXT NULL,
    encoding VARCHAR(255),
    mime_type VARCHAR(255),
    size DECIMAL(10,2),
    url TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- users 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    password VARCHAR(255) NOT NULL,
    access_token TEXT NULL,
    refresh_token TEXT NULL,
    device_token VARCHAR(255) NULL,
    image_url VARCHAR(255) NULL,
    sns_id VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO kuuu_db.categories
(title, created_at, updated_at, deleted_at) VALUES
('Musical&Movie', '2025-02-02 12:38:56', '2025-02-02 12:38:56', NULL),
('Life', '2025-02-02 12:38:56', '2025-02-02 12:38:56', NULL),
('Cafe&Restrant', '2025-02-02 12:38:56', '2025-02-02 12:38:56', NULL),
('Sightseeing', '2025-02-02 12:38:56', '2025-02-02 12:38:56', NULL);


INSERT INTO kuuu_db.sub_categories
(created_at, updated_at, deleted_at, title, anonymous_yn, title_yn, content_yn, thumbnail_yn, reference_place_yn, secret_yn, images_yn, attach_files_yn, comment_yn, view_cnt_yn, category_id)
VALUES('2025-02-02 12:42:04', '2025-02-02 12:42:04', NULL, 'Japan', 'N', 'Y', 'Y', 'N', 'Y', 'N', 'Y', 'N', 'N', 'Y', 1),
('2025-02-02 12:42:04', '2025-02-02 12:42:04', NULL, 'Korea', 'N', 'Y', 'Y', 'N', 'Y', 'N', 'Y', 'N', 'N', 'Y', 1),
('2025-02-02 12:42:04', '2025-02-02 12:42:04', NULL, 'Movie', 'N', 'Y', 'Y', 'N', 'N', 'N', 'Y', 'N', 'N', 'Y', 1),
('2025-02-02 12:42:04', '2025-02-02 12:42:04', NULL, 'Others', 'N', 'Y', 'Y', 'N', 'N', 'N', 'Y', 'Y', 'N', 'Y', 1),
('2025-02-02 12:47:34', '2025-02-02 12:47:34', NULL, 'Japan', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 2),
('2025-02-02 12:47:34', '2025-02-02 12:47:34', NULL, 'Korea', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 2),
('2025-02-02 12:47:34', '2025-02-02 12:47:34', NULL, 'Marriage', 'N', 'Y', 'Y', 'Y', 'N', 'N', 'Y', 'N', 'N', 'Y', 2),
('2025-02-02 12:47:34', '2025-02-02 12:47:34', NULL, 'Mart Shopping', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 2),
('2025-02-02 12:47:34', '2025-02-02 12:47:34', NULL, 'Others', 'N', 'Y', 'Y', 'Y', 'N', 'N', 'Y', 'Y', 'N', 'Y', 2),
('2025-02-02 12:48:59', '2025-02-02 12:48:59', NULL, 'Seoul Cafe', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 3),
('2025-02-02 12:48:59', '2025-02-02 12:48:59', NULL, 'Seoul Restrant', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 3),
('2025-02-02 12:48:59', '2025-02-02 12:48:59', NULL, 'Tokyo Cafe', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 3),
('2025-02-02 12:48:59', '2025-02-02 12:48:59', NULL, 'Tokyo Restrant', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 3),
('2025-02-02 12:48:59', '2025-02-02 12:48:59', NULL, 'Others', 'N', 'Y', 'Y', 'Y', 'N', 'N', 'Y', 'Y', 'N', 'Y', 3),
('2025-02-02 12:49:25', '2025-02-02 12:49:25', NULL, 'Others', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 4);