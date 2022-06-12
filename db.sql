SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `project`;

CREATE TABLE IF NOT EXISTS `collection` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `creation_date` date NOT NULL,
    `description` text NOT NULL,
    `user_id` int(10) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_user` (`user_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `picture` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `date` date NOT NULL,
    `width` int(10) UNSIGNED NOT NULL,
    `height` int(10) UNSIGNED NOT NULL,
    `path` varchar(100) NOT NULL,
    `collection_id` int(10) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_collection` (`collection_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `users` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` varchar(10) NOT NULL,
    `password` varchar(10) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `collection`
    ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `picture`
    ADD CONSTRAINT `fk_collection` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
