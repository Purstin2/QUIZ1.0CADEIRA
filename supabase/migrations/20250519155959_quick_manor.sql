/*
  # Initial Schema Setup

  1. New Tables
    - `emails` - Store user email addresses
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `source` (text)
    
    - `quiz_sessions` - Track quiz progress
      - `id` (uuid, primary key) 
      - `started_at` (timestamp)
      - `last_step` (text)
      - `completed` (boolean)
      - `user_agent` (text)
      - `email` (text, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public insert and authenticated select
*/

-- Create emails table
CREATE TABLE IF NOT EXISTS emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  source text DEFAULT 'quiz'
);

-- Create quiz_sessions table
CREATE TABLE IF NOT EXISTS quiz_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz DEFAULT now(),
  last_step text NOT NULL,
  completed boolean DEFAULT false,
  user_agent text,
  email text REFERENCES emails(email),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for emails table
CREATE POLICY "Anyone can insert emails"
ON emails
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Authenticated users can view emails"
ON emails
FOR SELECT
TO authenticated
USING (true);

-- Policies for quiz_sessions table
CREATE POLICY "Anyone can insert quiz sessions"
ON quiz_sessions
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update quiz sessions"
ON quiz_sessions 
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete quiz sessions"
ON quiz_sessions
FOR DELETE
TO public
USING (true);

CREATE POLICY "Anyone can select quiz sessions"
ON quiz_sessions
FOR SELECT
TO public
USING (true);