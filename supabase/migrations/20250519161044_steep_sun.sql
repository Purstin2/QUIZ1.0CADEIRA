/*
  # Quiz System Database Schema

  1. New Tables
    - `emails`
      - `id` (uuid, primary key) - Unique identifier for each email entry
      - `email` (text, unique) - Email address of the user
      - `created_at` (timestamptz) - When the email was added
      - `source` (text) - Source of the email, defaults to 'quiz'
    
    - `quiz_sessions`
      - `id` (uuid, primary key) - Unique identifier for each session
      - `started_at` (timestamptz) - When the session started
      - `last_step` (text) - Last completed step in the quiz
      - `completed` (boolean) - Whether the quiz was completed
      - `user_agent` (text) - Browser/device information
      - `email` (text) - Reference to emails table
      - `created_at` (timestamptz) - When the session was created

  2. Security
    - Enable RLS on both tables
    - Public insert access for both tables
    - Authenticated users can view emails
    - Public CRUD access for quiz sessions

  3. Relationships
    - quiz_sessions.email references emails.email
*/

-- Create emails table if it doesn't exist
CREATE TABLE IF NOT EXISTS emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  source text DEFAULT 'quiz'
);

-- Create quiz_sessions table if it doesn't exist
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

-- Drop existing policies to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can insert emails" ON emails;
  DROP POLICY IF EXISTS "Authenticated users can view emails" ON emails;
  DROP POLICY IF EXISTS "Anyone can insert quiz sessions" ON quiz_sessions;
  DROP POLICY IF EXISTS "Anyone can update quiz sessions" ON quiz_sessions;
  DROP POLICY IF EXISTS "Anyone can delete quiz sessions" ON quiz_sessions;
  DROP POLICY IF EXISTS "Anyone can select quiz sessions" ON quiz_sessions;
  DROP POLICY IF EXISTS "Allow public insert access to quiz sessions" ON quiz_sessions;
  DROP POLICY IF EXISTS "Allow public read access to quiz sessions" ON quiz_sessions;
  DROP POLICY IF EXISTS "Allow public update access to quiz sessions" ON quiz_sessions;
  DROP POLICY IF EXISTS "Allow public delete access to quiz sessions" ON quiz_sessions;
END $$;

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