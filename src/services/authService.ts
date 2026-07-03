import { supabase } from "../lib/supabase"; 

export async function login(emailOrUsername: string, password: string) {
  let loginEmail = emailOrUsername;

  // Cek apakah input mengandung '@' (itu email)
  const isEmail = emailOrUsername.includes('@');

  // Jika bukan email, panggil fungsi RPC yang tadi dibuat
  if (!isEmail) {
    const { data, error: rpcError } = await supabase
      .rpc('get_email_by_username', { input_username: emailOrUsername });

    if (rpcError || !data) {
      return { data: null, role: null, error: { message: "Username tidak ditemukan." } };
    }

    loginEmail = data; // Email didapat dari hasil RPC
  }

  // Lanjut login dengan email yang sudah valid
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password,
  });

  if (error) return { data: null, role: null, error };

  let userRole: string | null = null;

  // Set role secara dinamis setelah login berhasil
  if (authData.user) {
    // Memanfaatkan fungsi getUserRole yang sudah kamu buat di bawah
    userRole = await getUserRole(authData.user.id);
    
    if (userRole) {
      localStorage.setItem('user_role', userRole);
    }
  }

  // Kembalikan juga role-nya supaya bisa dibaca di LoginView
  return { data: authData, role: userRole, error: null };
}

export async function logout() {
  localStorage.removeItem('user_role');
  
  const { error } = await supabase.auth.signOut();
  if (!error) {
    window.location.href = '/login'; 
  }
}

export async function getUserRole(userId: string) {
  const { data: adminData, error: adminError } = await supabase
    .from('profiles_admin') 
    .select('id')    
    .eq('id', userId) 
    .maybeSingle(); 

  if (adminError) console.error("Admin check error:", adminError);
  if (adminData) return 'admin';

  const { data: userData, error: userError } = await supabase
    .from('profiles_user') 
    .select('id')    
    .eq('id', userId) 
    .maybeSingle();

  if (userError) console.error("User check error:", userError);
  if (userData) return 'user';

  return null; 
}

export async function getCurrentUser() {
  return await supabase.auth.getUser();
}

export async function getSession() {
  return await supabase.auth.getSession();
}