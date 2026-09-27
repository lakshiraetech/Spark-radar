"use server"

import { createClient } from './collect'
import { revalidatePath } from 'next/cache'

export async function getVendors() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data
}

export async function createVendor(vendorData: any) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('vendors')
    .insert([vendorData])
    .select()
    
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/vendors')
  return data[0]
}
