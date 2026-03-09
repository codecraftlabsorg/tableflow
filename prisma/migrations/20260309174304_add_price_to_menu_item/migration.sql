/*
  Warnings:

  - You are about to drop the column `imageurl` on the `menu_items` table. All the data in the column will be lost.
  - Added the required column `price` to the `menu_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu_items" DROP COLUMN "imageurl",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "totalAmount" SET DEFAULT 0;
