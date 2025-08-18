/*
  Warnings:

  - The values [COMPLETED] on the enum `Todo_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `todo` MODIFY `status` ENUM('PENDING', 'IN_PROGRESS') NOT NULL DEFAULT 'PENDING';
