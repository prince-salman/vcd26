<script setup lang="ts">
import { ref } from 'vue'
import { currentLang, translations } from '../store/langStore'

// Data dummy untuk galeri media
const mediaItems = ref([
  {
    id: 1,
    title: 'Gathering Batch 2026',
    description: 'Acara kebersamaan dan perkenalan awal seluruh mahasiswa IT angkatan 2026.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Team Project Collaboration',
    description: 'Mengerjakan tugas kelompok dan berkolaborasi dalam proyek pemrograman.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Coding Bootcamp',
    description: 'Sesi latihan coding intensif persiapan hackathon kampus.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Tech Seminar',
    description: 'Seminar teknologi yang dihadiri oleh praktisi industri IT terkemuka.',
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Campus Tour',
    description: 'Kegiatan pengenalan fasilitas laboratorium komputer kampus.',
    image: '/gedung-baru.png'
  }
])
</script>

<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">{{ translations[currentLang].mediaTitle }}</h1>
      <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
        {{ translations[currentLang].mediaSubtitle }}
      </p>
    </div>

    <!-- Gallery Container -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      <!-- Gallery Item Card -->
      <div 
        v-for="item in mediaItems" 
        :key="item.id" 
        class="bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
      >
        <img 
          :src="item.image" 
          :alt="item.title" 
          loading="lazy"
          class="w-full h-56 object-cover block" 
        />
        <div class="p-5 text-center">
          <h3 class="text-lg font-bold text-gray-900 mb-2">{{ item.title }}</h3>
          <p class="text-sm text-gray-500">{{ item.description }}</p>
        </div>
      </div>
      
    </div>
  </div>
</template>
