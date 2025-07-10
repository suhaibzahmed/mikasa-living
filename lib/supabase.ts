import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const imageBucket = process.env.SUPABASE_IMAGE_BUCKET_NAME!
const videoBucket = process.env.SUPABASE_VIDEO_BUCKET_NAME!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const uploadImageFile = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`
  const { error } = await supabase.storage
    .from(imageBucket)
    .upload(fileName, file, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Error uploading file:', error)
    return null
  }

  const { data: publicUrlData } = supabase.storage
    .from(imageBucket)
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}

export const deleteImageFile = async (filePath: string) => {
  const fileName = filePath.split('/').pop()
  if (!fileName) {
    return false
  }

  const decodedFileName = decodeURIComponent(fileName)

  if (!filePath) return true

  const { error } = await supabase.storage
    .from(imageBucket)
    .remove([decodedFileName])

  if (error) {
    console.error('Failed to delete image:', error.message)
    throw new Error(`Failed to delete image: ${error.message}`)
  }

  return true
}
