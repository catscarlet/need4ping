-- phpMyAdmin SQL Dump
-- version 4.4.15
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-01-04 09:33:07
-- 服务器版本： 5.6.26
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `need4ping`
--
CREATE DATABASE IF NOT EXISTS `need4ping` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `need4ping`;

-- --------------------------------------------------------

--
-- 表的结构 `pinglist`
--

DROP TABLE IF EXISTS `pinglist`;
CREATE TABLE IF NOT EXISTS `pinglist` (
  `id` int(255) NOT NULL,
  `server_name` varchar(50) NOT NULL,
  `alias_name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `state` varchar(50) NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `pingresult`
--

DROP TABLE IF EXISTS `pingresult`;
CREATE TABLE IF NOT EXISTS `pingresult` (
  `id` int(11) NOT NULL,
  `server_name` text NOT NULL,
  `TIME` int(4) unsigned DEFAULT NULL,
  `loss_percent` text NOT NULL,
  `rtt_min` int(11) NOT NULL,
  `rtt_avg` int(11) NOT NULL,
  `rtt_max` int(11) NOT NULL,
  `state` varchar(10) DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pinglist`
--
ALTER TABLE `pinglist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pingresult`
--
ALTER TABLE `pingresult`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pinglist`
--
ALTER TABLE `pinglist`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pingresult`
--
ALTER TABLE `pingresult`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
