/*
  # Quiz Analytics Tables
  
  1. New Tables
    - `quiz_sessions`
      - `id` (uuid, primary key)
      - `started_at` (timestamp)
      - `last_step` (text) - last completed quiz step
      - `completed` (boolean) - whether quiz was completed
      - `user_agent` (text) - browser info
      - `email` (text) - optional, linked to emails table
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on quiz_sessions table
    - Add policies for public insert and authenticated select
*/

CREATE TABLE IF NOT EXISTS quiz_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz DEFAULT now(),
  last_step text NOT NULL,
  completed boolean DEFAULT false,
  user_agent text,
  email text REFERENCES emails(email),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert quiz sessions"
  ON quiz_sessions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view quiz sessions"
  ON quiz_sessions
  FOR SELECT
  TO authenticated
  USING (true);