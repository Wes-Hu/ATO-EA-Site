import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yzkxinxskwwhigovfixx.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6a3hpbnhza3d3aGlnb3ZmaXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkxMDcwMzIsImV4cCI6MjAzNDY4MzAzMn0.z3veH7-Vob5QPNXzJghjRFMGy3fQs8gn5dunciWGX1A"

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchCarouselImages() {
    const { data, error } = await supabase
      .from('HomePageCarousel')
      .select('image_src')
      .eq('display', true)
  
    if (error) {
      console.error('Error fetching carousel images:', error)
      return []
    }
  
    return data.map((item: any) => item.image_src) || []
  }