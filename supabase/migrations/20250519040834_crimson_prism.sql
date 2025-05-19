/*
  # Add RLS policies for quiz sessions

  1. Security
    - Enable RLS on quiz_sessions table
    - Add policies for:
      - Public insert access
      - Authenticated users can view sessions
*/

-- Enable RLS
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new sessions
CREATE POLICY "Anyone can insert quiz sessions"
ON quiz_sessions
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to view sessions
CREATE POLICY "Authenticated users can view quiz sessions"
ON quiz_sessions
FOR SELECT
TO authenticated
USING (true);