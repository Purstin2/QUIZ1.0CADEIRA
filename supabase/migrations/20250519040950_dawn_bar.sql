/*
  # Fix duplicate RLS policies for quiz_sessions

  1. Changes
    - Safely enable RLS if not already enabled
    - Add insert policy for public users if not exists
    - Add select policy for authenticated users if not exists
  
  2. Security
    - Maintains existing RLS policies
    - Ensures policies are created only if missing
*/

-- Enable RLS if not already enabled
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

-- Add insert policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'quiz_sessions' 
    AND policyname = 'Anyone can insert quiz sessions'
  ) THEN
    CREATE POLICY "Anyone can insert quiz sessions"
      ON quiz_sessions
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

-- Add select policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'quiz_sessions' 
    AND policyname = 'Authenticated users can view quiz sessions'
  ) THEN
    CREATE POLICY "Authenticated users can view quiz sessions"
      ON quiz_sessions
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;