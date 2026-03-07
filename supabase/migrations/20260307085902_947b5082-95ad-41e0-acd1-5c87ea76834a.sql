
-- Tighten tire_brands: only authenticated can insert/update (already scoped to authenticated via RLS role, but add user check is not needed for shared reference data)
-- These are intentionally permissive for shared reference data - no change needed.

-- Tighten report_downloads INSERT: scope to authenticated users only instead of anyone
DROP POLICY IF EXISTS "Anyone can insert download records" ON public.report_downloads;
CREATE POLICY "Authenticated users can insert download records"
  ON public.report_downloads FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM reports
      WHERE reports.id = report_downloads.report_id
        AND reports.user_id = auth.uid()
    )
  );
