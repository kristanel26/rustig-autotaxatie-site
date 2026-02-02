-- Make client_name nullable since it was removed from the form
ALTER TABLE public.reports ALTER COLUMN client_name DROP NOT NULL;

-- Set a default value for existing null entries (if any)
UPDATE public.reports SET client_name = '' WHERE client_name IS NULL;