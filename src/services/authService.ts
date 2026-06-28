import { supabase } from "../lib/supabase"; 

// 1. Fungsi untuk Login
export async function login(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    window.location.href = '/login'; // Paksa pindah ke halaman login
  }
}

export async function getCurrentUser() {
  return await supabase.auth.getUser();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

export async function getUserRole(userId: string) {
  const { data, error } = await supabase
    .from('profiles') 
    .select('role')    
    .eq('id', userId) 
    .single();            

  if (error) {
    return null;
  }
  
  return data?.role; 
}