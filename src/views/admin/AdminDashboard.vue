<template>
  <div v-if="isAdmin" class="admin-container">
    <h1>Selamat Datang di Admin Dashboard</h1>
    <p>Ini adalah area khusus admin untuk mengelola media dan data.</p>
    
    <div class="admin-actions">
       <button>Tambah Media Baru</button>
    </div>
  </div>

  <div v-else class="loading">
    <p>Memverifikasi akses...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCurrentUser, getUserRole } from '../../services/authService';

const router = useRouter();
const isAdmin = ref(false);

onMounted(async () => {
  try {
    // 1. Cek apakah user udah login
    const userSession = await getCurrentUser();
    
    if (!userSession.data.user) {
      router.push('/login');
      return;
    }

    const role = await getUserRole(userSession.data.user.id);
    
    if (role !== 'admin') {
      router.push('/user'); 
    } else {
      isAdmin.value = true;
    }
  } catch (error) {
    console.error("Terjadi error saat verifikasi:", error);
    router.push('/login');
  }
});
</script>

<style scoped>
.admin-container {
  padding: 2rem;
}
</style>