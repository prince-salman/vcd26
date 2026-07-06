<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getArtworks } from '../services/dataService'

const categories = ['All', 'Graphic Design', 'Branding', 'Illustration', 'Photography', 'Videography/Animation', 'UI/UX Design'];
const selectedCategory = ref('All');

const artworks = ref<any[]>([]);

onMounted(async () => {
  artworks.value = await getArtworks()
})

const filteredArtworks = () => {
  if (selectedCategory.value === 'All') return artworks.value;
  return artworks.value.filter(art => art.category === selectedCategory.value);
}
</script>

<template>
  <div class="bg-white min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">Artwork Gallery</h1>
        <p class="mt-4 text-lg text-gray-500">Archive of portfolios and final projects of VCD students.</p>
      </div>

      <!-- Categories -->
      <div class="flex flex-wrap justify-center gap-2 mb-12">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="['px-4 py-2 rounded-full text-sm font-medium transition-colors', selectedCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Grid Karya -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="art in filteredArtworks()" :key="art.id" class="group relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
          <div class="aspect-w-4 aspect-h-3 bg-gray-200">
            <!-- Image -->
            <img v-if="art.image_url" :src="art.image_url" :alt="art.title" class="w-full h-full object-cover min-h-[200px]" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400 min-h-[200px]">
              [ No Image ]
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <span class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">{{ art.category }}</span>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ art.title }}</h3>
            <p class="text-sm text-gray-600 mb-4 flex-1">{{ art.desc }}</p>
            <div class="border-t border-gray-200 pt-4 mt-auto">
              <p class="text-sm font-medium text-gray-900">Creator: {{ art.maker }}</p>
              <p class="text-xs text-gray-500 mt-1">Supervising Lecturer: {{ art.lecturer }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="filteredArtworks().length === 0" class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500">
          No artworks found for this category.
        </div>
      </div>
    </div>
  </div>
</template>
