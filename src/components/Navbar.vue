<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-24">
        <div class="flex items-center">
          <RouterLink to="/" class="flex-shrink-0 flex items-center">
            <img src="/logo.png" alt="IT Logo" class="h-20 w-auto" />
          </RouterLink>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden sm:flex sm:items-center sm:space-x-8">
          <RouterLink to="/" class="text-gray-700 hover:text-pres-red px-3 py-2 rounded-md text-sm font-medium transition-colors" active-class="text-pres-red font-semibold">Home</RouterLink>
          <RouterLink to="/directory" class="text-gray-700 hover:text-pres-red px-3 py-2 rounded-md text-sm font-medium transition-colors" active-class="text-pres-red font-semibold">Directory</RouterLink>
          <RouterLink to="/projects" class="text-gray-700 hover:text-pres-red px-3 py-2 rounded-md text-sm font-medium transition-colors" active-class="text-pres-red font-semibold">Projects</RouterLink>
          <RouterLink to="/media" class="text-gray-700 hover:text-pres-red px-3 py-2 rounded-md text-sm font-medium transition-colors" active-class="text-pres-red font-semibold">Media</RouterLink>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button @click="toggleMenu" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pres-red" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg v-if="!isMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="sm:hidden border-t border-gray-200" id="mobile-menu">
      <div class="pt-2 pb-3 space-y-1">
        <RouterLink @click="toggleMenu" to="/" class="block px-4 py-2 text-base font-medium text-gray-700 hover:text-pres-red hover:bg-gray-50" active-class="text-pres-red bg-red-50 border-l-4 border-pres-red">Home</RouterLink>
        <RouterLink @click="toggleMenu" to="/directory" class="block px-4 py-2 text-base font-medium text-gray-700 hover:text-pres-red hover:bg-gray-50" active-class="text-pres-red bg-red-50 border-l-4 border-pres-red">Directory</RouterLink>
        <RouterLink @click="toggleMenu" to="/projects" class="block px-4 py-2 text-base font-medium text-gray-700 hover:text-pres-red hover:bg-gray-50" active-class="text-pres-red bg-red-50 border-l-4 border-pres-red">Projects</RouterLink>
        <RouterLink @click="toggleMenu" to="/media" class="block px-4 py-2 text-base font-medium text-gray-700 hover:text-pres-red hover:bg-gray-50" active-class="text-pres-red bg-red-50 border-l-4 border-pres-red">Media</RouterLink>
      </div>
    </div>
  </nav>
</template>
