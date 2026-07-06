<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getNews } from '../services/dataService'

const newsList = ref<any[]>([])

onMounted(async () => {
  newsList.value = await getNews()
})

const topNews = computed(() => {
  return newsList.value.find(n => n.isTop) || newsList.value[0]
})

const otherNews = computed(() => {
  if (!topNews.value) return []
  return newsList.value.filter(n => n.id !== topNews.value.id)
})
</script>

<template>
  <div class="bg-white min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">VCD News & Events</h1>
        <p class="mt-4 text-lg text-gray-500">Info on exhibitions, student achievements, and design articles.</p>
      </div>

      <!-- Highlight News -->
      <div v-if="topNews" class="mb-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col md:flex-row hover:shadow-md transition-shadow">
        <div class="md:w-1/2 bg-gray-200 min-h-[300px]">
          <!-- Placeholder Image -->
          <div class="w-full h-full flex items-center justify-center text-gray-400">
            [ Featured Event Image ]
          </div>
        </div>
        <div class="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full mb-4 w-max uppercase tracking-wider">{{ topNews.type }}</span>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ topNews.title }}</h2>
          <p class="text-gray-600 mb-6 text-lg">{{ topNews.description }}</p>
          <div class="space-y-2 mb-8">
            <div class="flex items-center text-gray-500 text-sm">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              {{ topNews.date || 'TBA' }}
            </div>
            <div class="flex items-center text-gray-500 text-sm">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              {{ topNews.location || 'TBA' }}
            </div>
          </div>
          <button class="bg-gray-900 text-white font-medium py-3 px-6 rounded-md hover:bg-gray-800 transition-colors w-max">
            Read Full Details
          </button>
        </div>
      </div>

      <!-- Other News Grid -->
      <h3 class="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">Latest Updates</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="news in otherNews" :key="news.id" class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
          <div class="h-40 bg-gray-200"></div>
          <div class="p-5 flex-1 flex flex-col">
            <div class="flex justify-between items-center mb-3">
              <span :class="['text-xs font-bold uppercase tracking-wider', news.type === 'ACHIEVEMENT' ? 'text-green-600' : (news.type === 'EVENT' ? 'text-blue-600' : (news.type === 'WORKSHOP' ? 'text-purple-600' : 'text-orange-600'))]">
                {{ news.type }}
              </span>
              <span class="text-xs text-gray-400">{{ news.date }}</span>
            </div>
            <h4 class="text-lg font-bold text-gray-900 mb-2 leading-tight">{{ news.title }}</h4>
            <p class="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{{ news.description }}</p>
            <button class="text-sm font-medium text-blue-600 hover:text-blue-800 text-left mt-auto">Read article &rarr;</button>
          </div>
        </div>
        
        <div v-if="otherNews.length === 0" class="col-span-1 md:col-span-2 lg:col-span-4 text-center py-12 text-gray-500">
          No other news available.
        </div>
      </div>

    </div>
  </div>
</template>
