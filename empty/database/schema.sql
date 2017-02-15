
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_name` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR NULL DEFAULT NULL,
  `flaps` INTEGER NULL DEFAULT NULL,
  `deaths` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `high_scores`;

CREATE TABLE `high_scores` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `score` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `death_coordinates`;

CREATE TABLE `death_coordinates` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `x_pos` INTEGER NULL DEFAULT NULL,
  `y_pos` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);



ALTER TABLE `high_scores` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `death_coordinates` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `high_scores` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `death_coordinates` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`user_name`,`password`,`flaps`,`deaths`) VALUES
-- ('','','','','');
-- INSERT INTO `high_scores` (`id`,`score`,`user_id`) VALUES
-- ('','','');
-- INSERT INTO `death_coordinates` (`id`,`x_pos`,`y_pos`,`user_id`) VALUES
-- ('','','','');
