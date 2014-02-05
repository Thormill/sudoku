
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Фев 05 2014 г., 07:26
-- Версия сервера: 5.1.69
-- Версия PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `u638130651_sudok`
--

-- --------------------------------------------------------

--
-- Структура таблицы `records`
--

CREATE TABLE IF NOT EXISTS `records` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` int(8) NOT NULL,
  `difficulty` tinyint(1) NOT NULL,
  `moves` int(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

--
-- Дамп данных таблицы `records`
--

INSERT INTO `records` (`id`, `user_id`, `difficulty`, `moves`) VALUES
(1, 0, 2, 1),
(2, 0, 2, 1),
(3, 1, 2, 1),
(4, 2, 2, 1),
(5, 3, 2, 1),
(6, 4, 2, 1),
(7, 5, 2, 1),
(8, 6, 2, 1),
(9, 7, 2, 1),
(10, 8, 2, 2),
(11, 9, 2, 1),
(12, 10, 2, 1),
(13, 11, 2, 1),
(14, 12, 2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`) VALUES
(1, 'as'),
(2, 'as'),
(3, 'as'),
(4, 'Anonymous'),
(5, 'Anonymous'),
(6, 'Anonymous'),
(7, 'Anonymous'),
(8, 'Anonymous'),
(9, 'Tosha'),
(10, 'Anonymous'),
(11, 'Anonymous'),
(12, 'Anonymous');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
