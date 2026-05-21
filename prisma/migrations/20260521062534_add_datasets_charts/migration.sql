-- CreateTable
CREATE TABLE "public"."Dataset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "headers" JSONB NOT NULL,
    "rowCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dataset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SavedChart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "xAxis" TEXT NOT NULL,
    "yAxis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedChart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Dataset_userId_idx" ON "public"."Dataset"("userId");

-- CreateIndex
CREATE INDEX "SavedChart_userId_idx" ON "public"."SavedChart"("userId");

-- AddForeignKey
ALTER TABLE "public"."Dataset" ADD CONSTRAINT "Dataset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SavedChart" ADD CONSTRAINT "SavedChart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SavedChart" ADD CONSTRAINT "SavedChart_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "public"."Dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
