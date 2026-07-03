<template>
  <div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div class="bg-white border border-gray-200 rounded-lg p-3 mb-6 shadow-sm text-center">
        <h1 class="text-sm font-bold text-gray-600 uppercase tracking-widest px-2">
          {{ translations[currentLang].dashboardUser }}
        </h1>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-gray-800">{{ translations[currentLang].welcome }}, {{ username }}!</h2>
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
            PRESIDENT UNIVERSITY INFORMATION TECHNOLOGY 2026
          </p>
        </div>
        
        <div class="flex items-center gap-3 mt-4 sm:mt-0">
          <div class="text-right">
            <h3 class="text-sm font-bold text-gray-800">{{ username }}</h3>
            <p class="text-xs text-gray-400">{{ userEmail }}</p> 
          </div>
          <div class="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-12 text-gray-500">
        isLoading data projects...
      </div>

      <div v-else class="space-y-8">
        
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-800">My Projects</h2>
            <button 
              @click="showModal = true" 
              class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              + {{ translations[currentLang].addNewProject }}
            </button>
          </div>

          <div class="overflow-x-auto border border-gray-100 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead class="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th class="px-4 py-3">Date</th>
                  <th class="px-4 py-3">Project Title</th>
                  <th class="px-4 py-3">Team Name</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="project in myProjects" :key="project.id" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-gray-500">
                    {{ new Date(project.created_at).toLocaleDateString('id-ID') }}
                  </td>
                  <td class="px-4 py-3 font-medium text-gray-900">{{ project.title }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ project.team_name || '-' }}</td>
                  <td class="px-4 py-3">
                    <span 
                      :class="{
                        'bg-yellow-100 text-yellow-800': project.status === 'pending',
                        'bg-green-100 text-green-800': project.status === 'published',
                        'bg-red-100 text-red-800': project.status === 'rejected' || project.status === 'banned'
                      }"
                      class="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize"
                    >
                      {{ project.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right whitespace-nowrap">
                    <a v-if="project.project_url" :href="project.project_url" target="_blank" class="text-blue-600 hover:underline text-xs">
                      View Link
                    </a>
                  </td>
                </tr>
                
                <tr v-if="myProjects.length === 0">
                  <td colspan="5" class="text-center py-8 text-gray-400">
                    No project added. Click "Add New Project" to start adding!
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </main>

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-800">Submit New Project</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        
        <form @submit.prevent="submitProject" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input v-model="form.title" type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="form.description" rows="3" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm"></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Team Name (Creators)</label>
            <input v-model="form.team_name" type="text" required placeholder="e.g. puit26, Lily & Friends" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project URL (Link)</label>
            <input v-model="form.project_url" type="url" placeholder="https://..." class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
            <input type="file" @change="handleFileUpload" accept="image/*" required class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <button type="button" @click="closeModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" :disabled="isSubmitting" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {{ isSubmitting ? 'Submitting...' : 'Submit to Admin' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'
import { currentLang, translations } from '../../store/langStore'

const isLoading = ref(true)
const isSubmitting = ref(false)
const showModal = ref(false)
const myProjects = ref([])
const currentUser = ref(null)
const userEmail = ref('') 
const username = ref('Student');
const router = useRouter();

// State untuk Form Input
const form = ref({
  title: '',
  description: '',
  team_name: '',
  project_url: ''
})
const selectedFile = ref(null)


onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    currentUser.value = user
    userEmail.value = user.email
    
    const { data: profile } = await supabase
      .from('profiles_user')
      .select('username')
      .eq('id', user.id)
      .single()
      
    if (profile) {
           
      username.value = profile.username 
    }
    // ----------------------------

    await fetchMyProjects()
  } else {
    console.warn("User belum login, redirecting...")
    router.push('/login')
  }
})

const fetchMyProjects = async () => {
  try {
    isLoading.value = true
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', currentUser.value.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    myProjects.value = data
  } catch (error) {
    console.error('Gagal mengambil data proyek:', error.message)
  } finally {
    isLoading.value = false
  }
}


const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]
}


const submitProject = async () => {
  if (!selectedFile.value) {
    alert("Silakan pilih thumbnail terlebih dahulu!")
    return
  }

  isSubmitting.value = true

  try {
    const fileExt = selectedFile.value.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${currentUser.value.id}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('project-thumbnails') // GANTI INI sesuai nama bucket di Supabase Anda
      .upload(filePath, selectedFile.value)

    if (uploadError) throw uploadError

    // B. Dapatkan URL Public dari gambar yang barusan di-upload
    const { data: publicUrlData } = supabase.storage
      .from('project-thumbnails')
      .getPublicUrl(filePath)
    
    const thumbnailUrl = publicUrlData.publicUrl

    // C. Insert data ke tabel 'projects' dengan status 'pending'
    const { error: insertError } = await supabase
      .from('projects')
      .insert([
        {
          user_id: currentUser.value.id,
          title: form.value.title,
          description: form.value.description,
          team_name: form.value.team_name,
          project_url: form.value.project_url,
          thumbnail_url: thumbnailUrl,
          status: 'pending' // Masuk ke antrean admin
        }
      ])

    if (insertError) throw insertError

    alert('Proyek berhasil disubmit dan sedang menunggu persetujuan Admin!')
    closeModal()
    fetchMyProjects() // Refresh tabel

  } catch (error) {
    console.error('Gagal submit proyek:', error.message)
    alert(`Terjadi kesalahan: ${error.message}`)
  } finally {
    isSubmitting.value = false
  }
}

// 5. Fungsi untuk reset dan tutup modal
const closeModal = () => {
  showModal.value = false
  form.value = { title: '', description: '', team_name: '', project_url: '' }
  selectedFile.value = null
}
</script>