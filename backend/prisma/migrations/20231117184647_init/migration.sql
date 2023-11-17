/*
  Warnings:

  - Added the required column `hashpassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `hashpassword` VARCHAR(191) NOT NULL;
