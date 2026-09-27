"use server"

import { createClient } from './collect'
import { revalidatePath } from 'next/cache'

export async function getTasks() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('support_tasks')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data
}

export async function createTask(taskData: any) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('support_tasks')
    .insert([taskData])
    .select()
    
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/support')
  return data[0]
}

export async function updateTaskStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('support_tasks')
    .update({ status })
    .eq('id', id)
    
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/support')
  return true
}
