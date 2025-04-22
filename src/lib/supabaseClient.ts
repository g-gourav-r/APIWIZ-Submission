import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oefhjziwsdfyxdfhnbye.supabase.co' // replace this
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZmhqeml3c2RmeXhkZmhuYnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMjYzNjEsImV4cCI6MjA2MDkwMjM2MX0.trqfaBGM2T2YxADJhLGO9rtIpZejPejwF79wRA_DM1U' // replace this

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
