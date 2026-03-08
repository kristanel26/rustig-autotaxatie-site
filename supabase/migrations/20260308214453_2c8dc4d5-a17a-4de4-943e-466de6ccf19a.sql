
-- Drop restrictive per-user SELECT policy
DROP POLICY IF EXISTS "Users can view their own customers" ON public.customers;

-- Allow all authenticated users to view all customers
CREATE POLICY "Authenticated users can view all customers"
  ON public.customers FOR SELECT
  TO authenticated
  USING (true);
