import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local')
}

const initialAuthCallbackParams =
  typeof window === 'undefined' ? null : new URLSearchParams(window.location.hash.slice(1))

export const hasInitialAuthCallback = Boolean(
  initialAuthCallbackParams?.has('access_token') ||
  initialAuthCallbackParams?.has('error_code') ||
  initialAuthCallbackParams?.has('error'),
)
export const isInitialSignupConfirmation =
  initialAuthCallbackParams?.get('type') === 'signup' && initialAuthCallbackParams.has('access_token')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)