/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserInventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserInventories` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "userRole" ADD VALUE 'OWNER';

-- DropForeignKey
ALTER TABLE "UserInventory" DROP CONSTRAINT "UserInventory_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserInventory" DROP CONSTRAINT "UserInventory_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserInventories" DROP CONSTRAINT "_UserInventories_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserInventories" DROP CONSTRAINT "_UserInventories_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "UserInventory";

-- DropTable
DROP TABLE "_UserInventories";

-- CreateTable
CREATE TABLE "InventoryUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "role" "userRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InventoryUser" ADD CONSTRAINT "InventoryUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryUser" ADD CONSTRAINT "InventoryUser_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
