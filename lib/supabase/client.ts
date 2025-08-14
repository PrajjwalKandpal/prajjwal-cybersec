import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Contact = {
  id?: number
  name: string
  email: string
  company?: string
  subject: string
  message: string
  phone?: string
  service_type?: string
  budget_range?: string
  created_at?: string
  status?: string
  notes?: string
}
