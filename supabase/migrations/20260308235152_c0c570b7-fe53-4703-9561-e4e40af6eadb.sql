ALTER TABLE public.reports 
ADD COLUMN assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL;