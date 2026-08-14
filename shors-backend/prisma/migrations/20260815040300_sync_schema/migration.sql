-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `FeaturedCollection` DROP FOREIGN KEY `FeaturedCollection_productOneId_fkey`;

-- DropForeignKey
ALTER TABLE `FeaturedCollection` DROP FOREIGN KEY `FeaturedCollection_productTwoId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `collectionId`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT 'Root Tote';

-- AlterTable
ALTER TABLE `ProductImage` MODIFY `imageType` ENUM('MAIN', 'HOVER', 'DETAIL_1', 'DETAIL_2') NOT NULL;

-- AlterTable
ALTER TABLE `Preorder` ADD COLUMN `fullName` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `internalNotes` TEXT NULL,
    ADD COLUMN `message` TEXT NULL,
    MODIFY `status` ENUM('NEW', 'CONTACTED', 'CONFIRMED', 'IN_PRODUCTION', 'READY', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'NEW';

-- DropTable
DROP TABLE `Collection`;

-- DropTable
DROP TABLE `FeaturedCollection`;

-- CreateTable
CREATE TABLE `HomepageShowcaseModule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blockOneBannerImage` VARCHAR(191) NULL,
    `blockOneBannerImagePublicId` VARCHAR(191) NULL,
    `blockOneLabel` VARCHAR(191) NULL,
    `blockOneCollectionName` VARCHAR(191) NULL,
    `blockOneDescription` TEXT NULL,
    `blockOneProductOneId` INTEGER NULL,
    `blockOneProductTwoId` INTEGER NULL,
    `blockOneIsActive` BOOLEAN NOT NULL DEFAULT true,
    `blockTwoBannerImage` VARCHAR(191) NULL,
    `blockTwoBannerImagePublicId` VARCHAR(191) NULL,
    `blockTwoLabel` VARCHAR(191) NULL,
    `blockTwoCollectionName` VARCHAR(191) NULL,
    `blockTwoDescription` TEXT NULL,
    `blockTwoProductOneId` INTEGER NULL,
    `blockTwoProductTwoId` INTEGER NULL,
    `blockTwoIsActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `sourcePage` VARCHAR(191) NULL,
    `triggerType` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HomepageShowcaseModule` ADD CONSTRAINT `HomepageShowcaseModule_blockOneProductOneId_fkey` FOREIGN KEY (`blockOneProductOneId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HomepageShowcaseModule` ADD CONSTRAINT `HomepageShowcaseModule_blockOneProductTwoId_fkey` FOREIGN KEY (`blockOneProductTwoId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HomepageShowcaseModule` ADD CONSTRAINT `HomepageShowcaseModule_blockTwoProductOneId_fkey` FOREIGN KEY (`blockTwoProductOneId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HomepageShowcaseModule` ADD CONSTRAINT `HomepageShowcaseModule_blockTwoProductTwoId_fkey` FOREIGN KEY (`blockTwoProductTwoId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
