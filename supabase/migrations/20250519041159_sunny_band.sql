/*
  # Fix quiz sessions RLS policies

  1. Changes
    - Update RLS policies for quiz_sessions table to allow public inserts
    - Keep existing policies for authenticated users

  2. Security
    - Enable RLS on quiz_sessions table
    - Allow public inserts for quiz sessions
    - Maintain authenticated user access for viewing
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Anyone can insert quiz sessions" ON quiz_sessions;
DROP POLICY IF EXISTS "Authenticated users can view quiz sessions" ON quiz_sessions;

-- Recreate policies with correct permissions
CREATE POLICY "Anyone can insert quiz sessions"
ON public.quiz_sessions
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Authenticated users can view quiz sessions"
ON public.quiz_sessions
FOR SELECT
TO authenticated
USING (true);