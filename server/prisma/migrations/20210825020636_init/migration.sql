/*
  Warnings:

  - You are about to drop the column `postId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `postId`;
