/*
 Navicat MySQL Data Transfer

 Source Server         : 本地mysql连接
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost
 Source Database       : graphql

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : utf-8

 Date: 03/19/2018 17:23:23 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `course`
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course` varchar(50) DEFAULT NULL,
  `score` int(5) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `course`
-- ----------------------------
BEGIN;
INSERT INTO `course` VALUES ('1', '数学', '33', '1'), ('2', '语文', '55', '3'), ('3', '数学', '55', '2'), ('4', '历史', '44', '2');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT '1',
  `intro` varchar(255) DEFAULT NULL,
  `stature` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'xiaoming', '1', '5555555555', '111'), ('2', '2', '1', 'sdfasdfasdfasdfasdf', '222'), ('3', '2333', '444', 'zhaiqianfeng', '111'), ('59', 'yaqoiao', '11', '123123', null), ('60', 'yaqoiao', '11', '123123', null), ('61', '222222', '2', '33', null), ('62', '222222', '2', '33', null), ('63', '222222', '2', '33', null);
COMMIT;

-- ----------------------------
--  Table structure for `userInfo`
-- ----------------------------
DROP TABLE IF EXISTS `userInfo`;
CREATE TABLE `userInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `times` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `userInfo`
-- ----------------------------
BEGIN;
INSERT INTO `userInfo` VALUES ('1', '1', '北京', '1'), ('3', '1', '上海', '2'), ('4', '2', '上海', '3'), ('5', '1', '天津', '3'), ('6', '3', '广东', '4'), ('7', '4', '辽宁', '1'), ('8', '4', '北京', '10');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
