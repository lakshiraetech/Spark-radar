"use server"

import { createClient } from './collect'
import { revalidatePath } from 'next/cache'

export async function getRepairs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('repair_tickets')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data
}

export async function createRepairTicket(repairData: any) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('repair_tickets')
    .insert([repairData])
    .select()
    
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/repair')
  return data[0]
}
