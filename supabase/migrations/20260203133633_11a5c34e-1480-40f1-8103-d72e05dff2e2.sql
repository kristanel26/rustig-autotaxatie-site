-- Create storage bucket for report photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('report-photos', 'report-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload photos to their own folder
CREATE POLICY "Users can upload their own report photos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'report-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to update their own photos
CREATE POLICY "Users can update their own report photos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'report-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to delete their own photos
CREATE POLICY "Users can delete their own report photos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'report-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public read access to photos (for PDF generation)
CREATE POLICY "Report photos are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'report-photos');