
-- Allow anonymous & authenticated uploads to the 'aanvraag-uploads' bucket, max 10 MB and allowed mime types.
-- No SELECT/UPDATE/DELETE policies are added; files are not publicly readable.

CREATE POLICY "Anyone can upload to aanvraag-uploads"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'aanvraag-uploads'
  AND COALESCE((metadata->>'size')::bigint, 0) <= 10485760
  AND lower(COALESCE(metadata->>'mimetype','')) IN (
    'image/jpeg','image/jpg','image/png','image/heic','image/heif','application/pdf'
  )
);
