-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "mass" TEXT NOT NULL,
    "hair_color" TEXT NOT NULL,
    "skin_color" TEXT NOT NULL,
    "eye_color" TEXT NOT NULL,
    "birth_year" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "homeworld" TEXT NOT NULL,
    "films" TEXT[],
    "species" TEXT[],
    "vehicles" TEXT[],
    "starships" TEXT[],
    "created" TEXT NOT NULL,
    "edited" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "third_party_userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_third_party_userId_key" ON "User"("third_party_userId");
