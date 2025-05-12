SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `browserhistory`;
CREATE DATABASE `browserhistory`;
USE `browserhistory`;

DROP TABLE IF EXISTS `navigations`;
CREATE TABLE `navigations` (
  `navid` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tzname` varchar(64) NOT NULL
);

DROP TABLE IF EXISTS `ticks`;
CREATE TABLE `ticks` (
  `navid` int(11) NOT NULL,
  `domain` varchar(256) NOT NULL,
  `url` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `title` text NOT NULL,
  INDEX `ticks_domain` (`domain`),
  INDEX `ticks_timestamp` (`timestamp`),
  CONSTRAINT `ticks_navid` FOREIGN KEY (`navid`) REFERENCES navigations(`navid`)
);
