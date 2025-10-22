-- Add new columns to help_requests table
ALTER TABLE help_requests ADD COLUMN IF NOT EXISTS urgency TEXT;

-- Add new columns to helpers table
ALTER TABLE helpers ADD COLUMN IF NOT EXISTS bio TEXT;