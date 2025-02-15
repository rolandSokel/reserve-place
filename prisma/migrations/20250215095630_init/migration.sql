/*
  Warnings:

  - You are about to drop the column `firstname` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "numPeople" INTEGER NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "resvervationDate" DATETIME NOT NULL,
    "createdAd" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" DATETIME NOT NULL
);
INSERT INTO "new_Reservation" ("arrivalTime", "createdAd", "email", "id", "lastName", "numPeople", "phone", "resvervationDate", "updatedDate") SELECT "arrivalTime", "createdAd", "email", "id", "lastName", "numPeople", "phone", "resvervationDate", "updatedDate" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
