"use server"

import { createClient } from './collect' // Reuse the client instantiation
import { revalidatePath } from 'next/cache'

// RENEW MODULE ACTIONS
export async function getRenewals() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('renew_items')
    .select('*')
    .order('renewal_date', { ascending: true })
  
  if (error) throw new Error(error.message)
  return data
}

export async function createRenewal(renewalData: any) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('renew_items')
    .insert([renewalData])
    .select()
    
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/renew')
  return data[0]
}

export async function acknowledgeAlert(alertId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('renew_alerts')
    .update({ status: 'acknowledged' })
    .eq('id', alertId)
    
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/renew')
  return true
}
