<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white border border-gray-200 rounded-lg p-3 mb-6 shadow-sm text-center">
        <h1 class="text-sm font-bold text-gray-600 uppercase tracking-widest px-2">
          Admin Dashboard
        </h1>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-gray-800">Welcome, Immanuel!</h2>
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
            PRESIDENT UNIVERSITY INFORMATION TECHNOLOGY 2026
          </p>
        </div>
        
        <div class="flex items-center gap-3 self-end sm:self-auto">
          <div class="text-right">
            <h3 class="text-sm font-bold text-gray-800">Administrator</h3>
            <p class="text-xs text-gray-400">admin@presuit26.com</p>
          </div>
          <div class="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-12 text-gray-500">
        Sedang memuat data proyek...
      </div>

      <div v-else class="space-y-8">
        
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-800">Project Approval Queue (Pending)</h2>
            <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {{ pendingProjects.length }} Waiting
            </span>
          </div>

          <div class="overflow-x-auto border border-gray-100 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead class="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th class="px-4 py-3">Date</th>
                  <th class="px-4 py-3">Project Title</th>
                  <th class="px-4 py-3">Team Name</th>
                  <th class="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="project in pendingProjects" :key="project.id" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-gray-500">
                    {{ new Date(project.created_at).toLocaleDateString('id-ID') }}
                  </td>
                  <td class="px-4 py-3 font-medium text-gray-900">{{ project.title }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ project.team_name || '-' }}</td>
                  <td class="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    <a :href="project.project_url" target="_blank" class="text-blue-600 hover:underline text-xs mr-2">View Link</a>
                    <button @click="handleApprove(project.id)" class="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded font-medium transition-colors">
                      Approve
                    </button>
                    <button @click="handleRejectOrDelete(project.id)" class="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded font-medium transition-colors">
                      Reject
                    </button>
                  </td>
                </tr>
                <tr v-if="pendingProjects.length === 0">
                  <td colspan="5" class="text-center py-8">
                    <div class="text-gray-400 py-4 italic">
                      Tidak ada proyek yang menunggu persetujuan.
                    </div>
                  </td>
                </tr>
                <tr v-if="pendingProjects.length === 0">
                  <td colspan="4" class="text-center py-8 text-gray-400">No pending projects. All clear!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-800">Published Projects</h2>
            <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {{ publishedProjects.length }} Active
            </span>
          </div>

          <div class="overflow-x-auto border border-gray-100 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead class="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th class="px-4 py-3">Published Date</th>
                  <th class="px-4 py-3">Project Title</th>
                  <th class="px-4 py-3">Team Name</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="project in publishedProjects" :key="project.id" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-gray-500">
                    {{ new Date(project.updated_at).toLocaleDateString('id-ID') }}
                  </td>
                  <td class="px-4 py-3 font-medium text-gray-900">{{ project.title }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ project.team_name || '-' }}</td>
                  <td class="px-4 py-3">
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">Published</span>
                  </td>
                  <td class="px-4 py-3 text-right whitespace-nowrap">
                    <button @click="handleRejectOrDelete(project.id)" class="text-red-600 hover:text-red-900 font-medium text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="publishedProjects.length === 0">
                  <td colspan="5" class="text-center py-8 text-gray-400">No public projects live yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// Sesuaikan path import supabaseClient di bawah ini dengan project lo
import { supabase } from '../../lib/supabase' 

// State untuk menampung data dari database
const pendingProjects = ref([])
const publishedProjects = ref([])
const isLoading = ref(true)

// 1. Fungsi untuk mengambil semua data proyek dari Supabase
const fetchProjects = async () => {
  isLoading.value = true
  try {
    // Ambil data proyek yang butuh persetujuan (status: pending)
    const { data: pendingData, error: pendingError } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (pendingError) throw pendingError
    pendingProjects.value = pendingData

    // Ambil data proyek yang sudah tayang (status: published)
    const { data: publishedData, error: publishedError } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (publishedError) throw publishedError
    publishedProjects.value = publishedData

  } catch (error) {
    console.error('Gagal mengambil data:', error.message)
    alert('Terjadi kesalahan saat mengambil data proyek.')
  } finally {
    isLoading.value = false
  }
}

// 2. Fungsi untuk menyetujui proyek (Ubah status jadi published)
const handleApprove = async (projectId) => {
  if (!confirm('Setujui proyek ini untuk diterbitkan ke publik?')) return
  isProcessing.value = true

  try {
    const { error } = await supabase
      .from('projects')
      .update({ status: 'published' })
      .eq('id', projectId)

    if (error) throw error
    
    alert('Proyek berhasil disetujui!')
    fetchProjects() 
  } catch (error) {
    console.error('Gagal menyetujui proyek:', error.message)
    alert('Gagal memproses persetujuan.')
  } finally {
    isProcessing.value = false 
  }
}

// 3. Fungsi untuk menolak/menghapus proyek
const handleRejectOrDelete = async (projectId) => {
  if (!confirm('Apakah Anda yakin ingin menghapus/menolak proyek ini?')) return

  try {
    // Pilihan A: Mengubah status menjadi banned/rejected
    const { error } = await supabase
      .from('projects')
      .update({ status: 'banned' })
      .eq('id', projectId)

    // Pilihan B: Kalau mau langsung dihapus dari database, ganti baris update di atas dengan ini:
    // const { error } = await supabase.from('projects').delete().eq('id', projectId)

    if (error) throw error

    alert('Aksi berhasil diproses!')
    fetchProjects() // Refresh data tabel
  } catch (error) {
    console.error('Gagal memproses aksi:', error.message)
    alert('Gagal memproses aksi.')
  }
}

// Jalankan fungsi ambil data saat halaman pertama kali dibuka
onMounted(() => {
  fetchProjects()
})
</script>