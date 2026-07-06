<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-white border-r border-gray-200 md:h-screen sticky top-0 flex flex-col">
      <div class="p-6 border-b border-gray-200 flex items-center justify-center md:justify-start">
        <h1 class="text-xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
      </div>
      <nav class="flex md:flex-col flex-1 p-4 gap-2 md:space-y-2 overflow-x-auto md:overflow-y-auto">

        <button 
          @click="activeTab = 'news'"
          :class="['w-auto md:w-full whitespace-nowrap flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors', activeTab === 'news' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100']"
        >
          News & Events
        </button>
        <button 
          @click="activeTab = 'gallery'"
          :class="['w-auto md:w-full whitespace-nowrap flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors', activeTab === 'gallery' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100']"
        >
          Artwork Gallery
        </button>
        <button 
          @click="activeTab = 'commissions'"
          :class="['w-auto md:w-full whitespace-nowrap flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors', activeTab === 'commissions' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100']"
        >
          Commission Art
        </button>
      </nav>
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-gray-900">Admin</p>
            <p class="text-xs text-gray-500 truncate w-32">{{ user?.email }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 lg:p-8 overflow-y-auto h-screen">
      


      <!-- TAB: NEWS -->
      <div v-if="activeTab === 'news'" class="space-y-6 animate-in fade-in duration-300">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-900">Manage News & Events</h2>
          <button @click="newsForm = {isTop: false}; showNewsForm = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">+ Add News</button>
        </div>

        <div v-if="showNewsForm" class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 class="text-lg font-bold mb-4">{{ newsForm.id ? 'Edit' : 'Add' }} News</h3>
          <form @submit.prevent="submitNews" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Type</label>
              <select v-model="newsForm.type" required class="w-full border-gray-300 rounded-md p-2 border">
                <option value="EVENT">EVENT</option>
                <option value="ACHIEVEMENT">ACHIEVEMENT</option>
                <option value="ARTICLE">ARTICLE</option>
                <option value="WORKSHOP">WORKSHOP</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Title</label>
              <input v-model="newsForm.title" required type="text" class="w-full border-gray-300 rounded-md p-2 border" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium mb-1">Description</label>
              <textarea v-model="newsForm.description" required rows="3" class="w-full border-gray-300 rounded-md p-2 border"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Date</label>
              <input v-model="newsForm.date" type="text" class="w-full border-gray-300 rounded-md p-2 border" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Location</label>
              <input v-model="newsForm.location" type="text" class="w-full border-gray-300 rounded-md p-2 border" />
            </div>
            <div class="md:col-span-2 flex items-center gap-2">
              <input type="checkbox" v-model="newsForm.isTop" id="isTop" />
              <label for="isTop" class="text-sm">Is Top Feature (Shows in Hero)</label>
            </div>
            <div class="md:col-span-2 flex justify-end gap-2 mt-4">
              <button type="button" @click="showNewsForm = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">Save</button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3">Type</th>
                <th class="px-4 py-3">Title</th>
                <th class="px-4 py-3">Date</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="item in newsList" :key="item.id" class="hover:bg-gray-50">
                <td class="px-4 py-3"><span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{{ item.type }}</span></td>
                <td class="px-4 py-3 font-medium">{{ item.title }} <span v-if="item.isTop" class="text-xs text-yellow-600">⭐ Top</span></td>
                <td class="px-4 py-3 text-gray-500">{{ item.date }}</td>
                <td class="px-4 py-3 text-right space-x-3">
                  <button @click="editNews(item)" class="text-blue-600 hover:underline">Edit</button>
                  <button @click="removeNews(item.id)" class="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB: GALLERY -->
      <div v-if="activeTab === 'gallery'" class="space-y-6 animate-in fade-in duration-300">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-900">Manage Artwork Gallery</h2>
          <button @click="galleryForm = {category: 'Graphic Design'}; showGalleryForm = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">+ Add Artwork</button>
        </div>

        <div v-if="showGalleryForm" class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <form @submit.prevent="submitGallery" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Title</label>
              <input v-model="galleryForm.title" required type="text" class="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Creator / Maker</label>
              <input v-model="galleryForm.maker" required type="text" class="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Category</label>
              <select v-model="galleryForm.category" required class="w-full border border-gray-300 rounded-md p-2">
                <option value="Graphic Design">Graphic Design</option>
                <option value="Branding">Branding</option>
                <option value="Illustration">Illustration</option>
                <option value="Photography">Photography</option>
                <option value="Videography/Animation">Videography/Animation</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Supervising Lecturer</label>
              <input v-model="galleryForm.lecturer" required type="text" class="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Artwork Image</label>
              <input type="file" @change="handleImageUpload" accept="image/*" class="w-full border border-gray-300 rounded-md p-1.5 text-sm" />
              <p v-if="galleryForm.image_url" class="text-xs text-green-600 mt-1">Image selected/uploaded.</p>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium mb-1">Description</label>
              <textarea v-model="galleryForm.desc" required rows="2" class="w-full border border-gray-300 rounded-md p-2"></textarea>
            </div>
            <div class="md:col-span-2 flex justify-end gap-2 mt-4">
              <button type="button" @click="showGalleryForm = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
              <button type="submit" :disabled="isUploadingImage" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50">
                {{ isUploadingImage ? 'Uploading...' : 'Save' }}
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3">Title</th>
                <th class="px-4 py-3">Creator</th>
                <th class="px-4 py-3">Category</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="art in galleryList" :key="art.id" class="hover:bg-gray-50">
                <td class="px-4 py-3 font-medium">{{ art.title }}</td>
                <td class="px-4 py-3 text-gray-600">{{ art.maker }}</td>
                <td class="px-4 py-3"><span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{{ art.category }}</span></td>
                <td class="px-4 py-3 text-right space-x-3">
                  <button @click="editGallery(art)" class="text-blue-600 hover:underline">Edit</button>
                  <button @click="removeGallery(art.id)" class="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB: COMMISSIONS -->
      <div v-if="activeTab === 'commissions'" class="space-y-6 animate-in fade-in duration-300">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-900">Manage Commissions</h2>
          <button @click="commForm = {available: true}; showCommForm = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">+ Add Provider</button>
        </div>

        <div v-if="showCommForm" class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <form @submit.prevent="submitCommission" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Name / Nickname</label>
              <input v-model="commForm.name" required type="text" class="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Service Focus (e.g. Illustration)</label>
              <input v-model="commForm.focus" required type="text" class="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Starting Price</label>
              <input v-model="commForm.price" required type="text" class="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Contact (IG/Email)</label>
              <input v-model="commForm.contact" required type="text" class="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div class="md:col-span-2 flex items-center gap-2">
              <input type="checkbox" v-model="commForm.available" id="available" />
              <label for="available" class="text-sm font-medium">Status Open (Available for commissions)</label>
            </div>
            <div class="md:col-span-2 flex justify-end gap-2 mt-4">
              <button type="button" @click="showCommForm = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">Save</button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3">Provider</th>
                <th class="px-4 py-3">Focus</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="item in commList" :key="item.id" class="hover:bg-gray-50">
                <td class="px-4 py-3 font-medium">{{ item.name }}</td>
                <td class="px-4 py-3 text-gray-600">{{ item.focus }}</td>
                <td class="px-4 py-3">
                  <span v-if="item.available" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Open</span>
                  <span v-else class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Closed</span>
                </td>
                <td class="px-4 py-3 text-right space-x-3">
                  <button @click="editCommission(item)" class="text-blue-600 hover:underline">Edit</button>
                  <button @click="removeCommission(item.id)" class="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase' 
import { getNews, saveNewsItem, deleteNewsItem, getArtworks, saveArtwork, deleteArtwork, getCommissions, saveCommission, deleteCommission, uploadArtworkImage } from '../../services/dataService'

const activeTab = ref('news')



// News Logic
const newsList = ref<any[]>([])
const showNewsForm = ref(false)
const newsForm = ref<any>({})

const refreshNews = async () => { newsList.value = await getNews() }
const submitNews = async () => { await saveNewsItem({...newsForm.value}); showNewsForm.value = false; await refreshNews(); }
const editNews = (item: any) => { newsForm.value = {...item}; showNewsForm.value = true; }
const removeNews = async (id: number) => { if(confirm('Delete this news?')) { await deleteNewsItem(id); await refreshNews(); } }

// Gallery Logic
const galleryList = ref<any[]>([])
const showGalleryForm = ref(false)
const galleryForm = ref<any>({})
const selectedImageFile = ref<File | null>(null)
const isUploadingImage = ref(false)

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedImageFile.value = target.files[0];
  }
}

const refreshGallery = async () => { galleryList.value = await getArtworks() }
const submitGallery = async () => { 
  isUploadingImage.value = true;
  try {
    if (selectedImageFile.value) {
      const url = await uploadArtworkImage(selectedImageFile.value);
      galleryForm.value.image_url = url;
    }
    await saveArtwork({...galleryForm.value}); 
    showGalleryForm.value = false; 
    selectedImageFile.value = null;
    await refreshGallery(); 
  } finally {
    isUploadingImage.value = false;
  }
}
const editGallery = (item: any) => { galleryForm.value = {...item}; selectedImageFile.value = null; showGalleryForm.value = true; }
const removeGallery = async (id: number) => { if(confirm('Delete artwork?')) { await deleteArtwork(id); await refreshGallery(); } }

// Commission Logic
const commList = ref<any[]>([])
const showCommForm = ref(false)
const commForm = ref<any>({available: true})

const refreshCommissions = async () => { commList.value = await getCommissions() }
const submitCommission = async () => { await saveCommission({...commForm.value}); showCommForm.value = false; await refreshCommissions(); }
const editCommission = (item: any) => { commForm.value = {...item}; showCommForm.value = true; }
const removeCommission = async (id: number) => { if(confirm('Delete commission provider?')) { await deleteCommission(id); await refreshCommissions(); } }


onMounted(async () => {

  refreshNews()
  refreshGallery()
  refreshCommissions()

  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      user.value = session.user
    }
  } catch (err) {
    console.error("Auth error:", err)
  } finally {
    loading.value = false
  }
})
</script>