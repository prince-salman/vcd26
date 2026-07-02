<script setup lang="ts">
import { currentLang, translations } from '../store/langStore'
// Frontend Developer (Project Section): zhel
// Silakan bangun komponen tampilan daftar project angkatan dan integrasi datanya di sini.
</script>

<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">{{ translations[currentLang].projTitle }}</h1>
      <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
        
      </p>
    </div>
  </div>
</template>
