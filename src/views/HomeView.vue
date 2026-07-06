<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getNews } from '../services/dataService'

const newsList = ref<any[]>([])

onMounted(async () => {
  newsList.value = await getNews()
})

const topNewsList = computed(() => {
  return newsList.value.filter(n => n.isTop).slice(0, 3)
})
</script>

<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative bg-gray-900 text-white overflow-hidden min-h-[70vh] flex items-center">
      <div class="absolute inset-0">
        <img src="/gedungfada.jpeg" alt="FADA Building" class="w-full h-full object-cover object-center" />
        <div class="absolute inset-0 bg-gray-900/60"></div>
      </div>
      <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl text-white mb-6">
          Limitless Creativity.
        </h1>
        <p class="mt-4 text-xl max-w-3xl text-gray-300 font-light">
          Visual Communication Design Study Program. The birthplace of innovative works and future designers.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-none mx-auto">
          <RouterLink to="/galeri" class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-sm shadow-sm text-gray-900 bg-white hover:bg-gray-100 transition-colors w-full sm:w-auto">
            Explore Works
          </RouterLink>
          <RouterLink to="/profil" class="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-bold rounded-sm text-white hover:bg-white hover:text-gray-900 transition-colors w-full sm:w-auto">
            Get to Know Us
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Berita Utama -->
    <div class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Top News & Events</h2>
          <p class="mt-4 text-lg text-gray-500">Follow the latest updates, exhibitions, and workshops from VCD.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="item in topNewsList" :key="item.id" class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
            <div class="h-48 bg-gray-200"></div>
            <div class="p-6 flex-1 flex flex-col">
              <p :class="['text-sm font-semibold mb-2 uppercase', item.type === 'ACHIEVEMENT' ? 'text-green-600' : (item.type === 'ARTICLE' ? 'text-purple-600' : 'text-blue-600')]">{{ item.type }}</p>
              <h3 class="text-xl font-bold text-gray-900 mb-3">{{ item.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{{ item.description }}</p>
              <RouterLink to="/news" class="text-blue-600 font-medium hover:text-blue-800 text-sm flex items-center mt-auto">
                Read more <span class="ml-1">&rarr;</span>
              </RouterLink>
            </div>
          </div>
          
          <div v-if="topNewsList.length === 0" class="col-span-3 text-center text-gray-500 py-12">
            No top news currently available.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
