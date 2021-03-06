-- CreateTable
CREATE TABLE `Comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `commentBody` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comments` ADD FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
