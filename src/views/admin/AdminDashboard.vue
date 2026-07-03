<template>
  <div class="min-h-screen bg-gray-50">

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white border border-gray-200 rounded-lg p-3 mb-6 shadow-sm text-center">
        <h1 class="text-sm font-bold text-gray-600 uppercase tracking-widest px-2">
          {{ translations[currentLang].adminDashboard }}
        </h1>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-gray-800">{{ translations[currentLang].welcome }}, {{ profile?.username }}!</h2>
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
            PRESIDENT UNIVERSITY INFORMATION TECHNOLOGY 2026
          </p>
        </div>
        
        <div class="flex items-center gap-3 self-end sm:self-auto">
          <div class="text-right">
            <h3 class="text-sm font-bold text-gray-800">{{ profile?.username }}</h3>
            <p class="text-xs text-gray-400">{{ user?.email }}</p>
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
            <h2 class="text-lg font-bold text-gray-800">{{ translations[currentLang].projectApprovalQueue }}</h2>
            <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {{ pendingProjects.length }} Waiting
            </span>
          </div>

          <div class="overflow-x-auto border border-gray-100 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead class="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th class="px-4 py-3">{{ translations[currentLang].date }}</th>
                  <th class="px-4 py-3">{{ translations[currentLang].projectTitle }}</th>
                  <th class="px-4 py-3">{{ translations[currentLang].teamName }}</th>
                  <th class="px-4 py-3 text-right">{{ translations[currentLang].actions }}</th>
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
                      {{ translations[currentLang].approve }}
                    </button>
                    <button @click="handleRejectOrDelete(project.id)" class="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded font-medium transition-colors">
                      {{ translations[currentLang].reject }}
                    </button>
                  </td>
                </tr>
                <tr v-if="pendingProjects.length === 0">
                  <td colspan="4" class="text-center py-8 text-gray-400">{{ translations[currentLang].noPendingProjects }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-800">{{ translations[currentLang].noPublishedProjects }}</h2>
            <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {{ publishedProjects.length }} Active
            </span>
          </div>

          <div class="overflow-x-auto border border-gray-100 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead class="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th class="px-4 py-3">{{ translations[currentLang].date }}</th>
                  <th class="px-4 py-3">{{ translations[currentLang].projectTitle }}</th>
                  <th class="px-4 py-3">{{ translations[currentLang].teamName }}</th>
                  <th class="px-4 py-3">{{ translations[currentLang].status }}</th>
                  <th class="px-4 py-3 text-right">{{ translations[currentLang].actions }}</th>
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
                  <td colspan="5" class="text-center py-8 text-gray-400">{{ translations[currentLang].noPublishedProjects }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase' 
import { currentLang, translations } from '../../store/langStore'

const pendingProjects = ref<any[]>([])
const publishedProjects = ref<any[]>([])
const isLoading = ref(true)
const isProcessing = ref(false)

const user = ref<any>(null)
const profile = ref<any>(null)
const loading = ref(true)

const fetchProjects = async () => {
  isLoading.value = true
  try {
    const { data: pendingData, error: pendingError } = await supabase
      .rpc('get_projects_by_status', { p_status: 'pending' })

    if (pendingError) throw pendingError
    pendingProjects.value = pendingData

    const { data: publishedData, error: publishedError } = await supabase
      .rpc('get_projects_by_status', { p_status: 'published' })

    if (publishedError) throw publishedError
    publishedProjects.value = publishedData

  } catch (error: any) {
    console.error('Gagal mengambil data:', error.message)
    alert('Terjadi kesalahan saat mengambil data proyek.')
  } finally {
    isLoading.value = false
  }
}

const handleApprove = async (projectId: string | number) => {
  if (!confirm('Setujui proyek ini untuk diterbitkan ke publik?')) return
  isProcessing.value = true

  try {
    // Ganti bagian ini pakai rpc
    const { error } = await supabase.rpc('update_project_status', {
      p_project_id: projectId,
      p_new_status: 'published'
    })

    if (error) throw error
    
    alert('Proyek berhasil disetujui!')
    fetchProjects() 
  } catch (error: any) {
    console.error('Gagal menyetujui proyek:', error.message)
    alert('Gagal memproses persetujuan.')
  } finally {
    isProcessing.value = false 
  }
}

const handleRejectOrDelete = async (projectId: string | number) => {
  if (!confirm('Apakah Anda yakin ingin menghapus/menolak proyek ini?')) return
  isProcessing.value = true

  try {
    // Ganti bagian ini pakai rpc
    const { error } = await supabase.rpc('update_project_status', {
      p_project_id: projectId,
      p_new_status: 'banned'
    })

    if (error) throw error

    alert('Aksi berhasil diproses!')
    fetchProjects() // Pastikan fetchProjects ini juga udah pakai rpc yang sebelumnya kita bahas ya!
  } catch (error: any) {
    console.error('Gagal memproses aksi:', error.message)
    alert('Gagal memproses aksi.')
  } finally {
    isProcessing.value = false
  }
}

onMounted(async () => {
  fetchProjects()

  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      user.value = session.user

      // 👇 Panggil RPC yang barusan kita bikin 👇
      const { data, error } = await supabase
        .rpc('get_admin_profile', {
          p_admin_id: session.user.id
        })
        .maybeSingle() // Pakai maybeSingle karena ekspektasinya cuma 1 baris data

      if (error) {
        console.error("Gagal mengambil data profil lewat RPC:", error.message)
      } else {
        // Data berhasil diambil nembus RLS!
        profile.value = data 
      }
    }
  } catch (err) {
    console.error("Kesalahan sistem:", err)
  } finally {
    loading.value = false
  }
})
</script>