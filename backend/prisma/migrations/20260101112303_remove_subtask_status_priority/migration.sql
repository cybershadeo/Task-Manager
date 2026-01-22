/*
  Warnings:

  - You are about to drop the column `priority` on the `Subtask` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Subtask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subtask" DROP COLUMN "priority",
DROP COLUMN "status";
