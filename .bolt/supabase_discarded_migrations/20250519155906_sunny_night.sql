/*
  # Fix quiz sessions RLS policies

  1. Changes
    - Drop existing policies if they exist
    - Recreate policies with proper permissions
    - Enable RLS if not already enabled
  
  2. Security
    - Maintains public insert access
    - Restricts view access to authenticated users
*/

-- First ensure RLS is enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'quiz_sessions' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Safely drop existing policies
DROP POLICY IF EXISTS "Anyone can insert quiz sessions" ON quiz_sessions;
DROP POLICY IF EXISTS "Authenticated users can view quiz sessions" ON quiz_sessions;

-- Create fresh policies
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