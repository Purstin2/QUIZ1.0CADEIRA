/*
  # Create emails table for lead capture
  
  1. New Tables
    - `emails`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `source` (text) - where the email was captured from
      
  2. Security
    - Enable RLS on `emails` table
    - Add policy for authenticated users to insert emails
*/

CREATE TABLE IF NOT EXISTS emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  source text DEFAULT 'quiz'
);

ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

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