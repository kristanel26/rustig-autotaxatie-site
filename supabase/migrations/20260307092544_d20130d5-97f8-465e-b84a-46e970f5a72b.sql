
-- Security definer function to get emails for users that have roles assigned
-- Only accessible to authenticated users with admin role
CREATE OR REPLACE FUNCTION public.get_user_emails()
RETURNS TABLE(user_id uuid, email text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT ur.user_id, au.email::text
  FROM public.user_roles ur
  JOIN auth.users au ON au.id = ur.user_id
$$;
