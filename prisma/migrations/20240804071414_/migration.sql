/*
  Warnings:

  - You are about to drop the `InventoryUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InventoryUser" DROP CONSTRAINT "InventoryUser_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryUser" DROP CONSTRAINT "InventoryUser_userId_fkey";

-- DropTable
DROP TABLE "InventoryUser";

-- CreateTable
CREATE TABLE "InventoryMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "role" "userRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InventoryMember" ADD CONSTRAINT "InventoryMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryMember" ADD CONSTRAINT "InventoryMember_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
