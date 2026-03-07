CREATE POLICY "Authenticated users can update finalized reports"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'finalized-reports' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'finalized-reports' AND auth.role() = 'authenticated');