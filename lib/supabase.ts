import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const bucket = process.env.SUPABASE_IMAGE_BUCKET_NAME!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const uploadImageFile = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`
  const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
    contentType: file.type,
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    console.error('Error uploading file:', error)
    return null
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}
