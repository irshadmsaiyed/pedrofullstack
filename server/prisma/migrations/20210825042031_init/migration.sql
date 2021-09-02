/*
  Warnings:

  - You are about to drop the column `userId` on the `posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_ibfk_1`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `userId`;
