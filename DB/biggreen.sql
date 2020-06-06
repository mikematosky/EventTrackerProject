-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema biggreendb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `biggreendb` ;

-- -----------------------------------------------------
-- Schema biggreendb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `biggreendb` DEFAULT CHARACTER SET utf8 ;
USE `biggreendb` ;

-- -----------------------------------------------------
-- Table `waterings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `waterings` ;

CREATE TABLE IF NOT EXISTS `waterings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `is_rain` TINYINT NULL,
  `date` DATETIME NULL,
  `inches` DOUBLE NULL,
  `duration` DOUBLE NULL,
  `observations` VARCHAR(5000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS hank@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'hank'@'localhost' IDENTIFIED BY 'hank';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'hank'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `waterings`
-- -----------------------------------------------------
START TRANSACTION;
USE `biggreendb`;
INSERT INTO `waterings` (`id`, `is_rain`, `date`, `inches`, `duration`, `observations`) VALUES (1, 0, '2020-05-31', .25, 0.5, 'The perimeter grass near the flower beds is going dormant. Weeds in back yard');
INSERT INTO `waterings` (`id`, `is_rain`, `date`, `inches`, `duration`, `observations`) VALUES (2, 1, '2020-06-02', .5, 1.5, 'Flooding in the low area of the back yard. Some flowerbed erosion.');
INSERT INTO `waterings` (`id`, `is_rain`, `date`, `inches`, `duration`, `observations`) VALUES (3, 0, '2020-06-04', 0.1, .15, 'Spot treated some higher areas of dormant grass');
INSERT INTO `waterings` (`id`, `is_rain`, `date`, `inches`, `duration`, `observations`) VALUES (4, 1, '2020-06-05', 0.05, .5, 'Light drizzle, during a high humidity time. Might not have made it to the roots. ');

COMMIT;

