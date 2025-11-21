-- NeuroIQ Database Schema
-- Run this SQL in Supabase SQL Editor

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create TestSession table
CREATE TABLE IF NOT EXISTS "TestSession" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT,
  "age" INTEGER,
  "education" TEXT,
  "gender" TEXT,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completedAt" TIMESTAMP(3),
  "hasPaid" BOOLEAN NOT NULL DEFAULT false,
  "paidAt" TIMESTAMP(3),
  "amount" DOUBLE PRECISION,
  "currency" TEXT,
  FOREIGN KEY ("userId") REFERENCES "User"("id")
);

CREATE INDEX IF NOT EXISTS "TestSession_userId_idx" ON "TestSession"("userId");

-- Create Question table
CREATE TABLE IF NOT EXISTS "Question" (
  "id" SERIAL PRIMARY KEY,
  "type" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "difficulty" INTEGER NOT NULL,
  "content" JSONB NOT NULL,
  "options" JSONB NOT NULL,
  "correctAnswer" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "Question_type_idx" ON "Question"("type");
CREATE INDEX IF NOT EXISTS "Question_category_idx" ON "Question"("category");
CREATE INDEX IF NOT EXISTS "Question_difficulty_idx" ON "Question"("difficulty");

-- Create Answer table
CREATE TABLE IF NOT EXISTS "Answer" (
  "id" TEXT PRIMARY KEY,
  "sessionId" TEXT NOT NULL,
  "questionId" INTEGER NOT NULL,
  "selectedOption" INTEGER NOT NULL,
  "timeTakenMs" INTEGER NOT NULL,
  "isCorrect" BOOLEAN NOT NULL,
  "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("sessionId") REFERENCES "TestSession"("id") ON DELETE CASCADE,
  FOREIGN KEY ("questionId") REFERENCES "Question"("id")
);

CREATE INDEX IF NOT EXISTS "Answer_sessionId_idx" ON "Answer"("sessionId");
CREATE INDEX IF NOT EXISTS "Answer_questionId_idx" ON "Answer"("questionId");

-- Create Result table
CREATE TABLE IF NOT EXISTS "Result" (
  "id" TEXT PRIMARY KEY,
  "sessionId" TEXT NOT NULL UNIQUE,
  "iq" INTEGER NOT NULL,
  "percentile" INTEGER NOT NULL,
  "classification" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "categoryBreakdown" JSONB NOT NULL,
  "totalQuestions" INTEGER NOT NULL,
  "correctAnswers" INTEGER NOT NULL,
  "averageTime" DOUBLE PRECISION NOT NULL,
  "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("sessionId") REFERENCES "TestSession"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "Result_sessionId_idx" ON "Result"("sessionId");

-- Create Transaction table
CREATE TABLE IF NOT EXISTS "Transaction" (
  "id" TEXT PRIMARY KEY,
  "sessionId" TEXT NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "paymentMethod" TEXT NOT NULL,
  "externalId" TEXT UNIQUE,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "Transaction_sessionId_idx" ON "Transaction"("sessionId");
CREATE INDEX IF NOT EXISTS "Transaction_status_idx" ON "Transaction"("status");
