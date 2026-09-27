"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function createClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// COLLECT MODULE ACTIONS
export async function getInvoices() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('collect_invoices')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data
}

export async function createInvoice(invoiceData: any) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('collect_invoices')
    .insert([invoiceData])
    .select()
    
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/collect')
  return data[0]
}

export async function updateInvoiceStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('collect_invoices')
    .update({ status })
    .eq('id', id)
    
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/collect')
  return true
}
