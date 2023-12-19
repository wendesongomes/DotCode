/*
  Warnings:

  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Saves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Saves" (
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Saves_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Saves_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Saves" ("postId", "userId") SELECT "postId", "userId" FROM "Saves";
DROP TABLE "Saves";
ALTER TABLE "new_Saves" RENAME TO "Saves";
CREATE UNIQUE INDEX "Saves_userId_postId_key" ON "Saves"("userId", "postId");
CREATE TABLE "new_Like" (
    "authorId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Like_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("postId") SELECT "postId" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
CREATE UNIQUE INDEX "Like_authorId_postId_key" ON "Like"("authorId", "postId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;