import { createClient } from '@supabase/supabase-js'
import { Database } from './supabaseTypes'

const supabaseUrl = "https://yzkxinxskwwhigovfixx.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6a3hpbnhza3d3aGlnb3ZmaXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkxMDcwMzIsImV4cCI6MjAzNDY4MzAzMn0.z3veH7-Vob5QPNXzJghjRFMGy3fQs8gn5dunciWGX1A"


export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

