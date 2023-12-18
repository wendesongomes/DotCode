/*
  Warnings:

  - The primary key for the `Saves` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Saves` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Saves" (
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Saves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Saves_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Saves" ("postId", "userId") SELECT "postId", "userId" FROM "Saves";
DROP TABLE "Saves";
ALTER TABLE "new_Saves" RENAME TO "Saves";
CREATE UNIQUE INDEX "Saves_userId_postId_key" ON "Saves"("userId", "postId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
