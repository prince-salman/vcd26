<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50 border-b-8 border-pres-blue">
    <div class="max-w-full mx-auto px-4 lg:px-4">
      <div class="flex justify-between items-center h-18">
        <div class="flex flex-1 items-center">
          <RouterLink to="/" class="flex-shrink-0 flex items-center -mb-2">
            <img src="/logo.png" alt="IT Logo" class="h-10 w-auto -mt-2" />
          </RouterLink>

          <button class="hidden sm:flex items-center text-gray-500 hover:text-pres-blue px-2 py-1.5 text-sm transition-colors font-medium mt-1 ml-4">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Search
          </button>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden sm:flex flex-1 justify-center items-center sm:space-x-8">
          <RouterLink
            to="/"
            class="text-gray-700 hover:text-pres-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-pres-blue font-semibold"
            >Home</RouterLink
          >
          <RouterLink
            to="/directory"
            class="text-gray-700 hover:text-pres-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-pres-blue font-semibold"
            >Directory</RouterLink
          >
          <RouterLink
            to="/projects"
            class="text-gray-700 hover:text-pres-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-pres-blue font-semibold"
            >Projects</RouterLink
          >
          <RouterLink
            to="/media"
            class="text-gray-700 hover:text-pres-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-pres-blue font-semibold"
            >Media</RouterLink
          >
        </div>

        <div class="flex-1 flex items-center justify-end space-x-6">
          <button class="hidden sm:block text-gray-500 hover:text-pres-blue transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
          </button>

          <div class="hidden sm:block h-6 w-px bg-gray-300"></div>

          <button class="hidden sm:block text-gray-500 hover:text-pres-blue transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>



        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden space-x-2">
          <button class="text-gray-500 hover:text-pres-blue p-2 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button
            @click="toggleMenu"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pres-blue"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!isMenuOpen"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMenuOpen"
      class="sm:hidden border-t border-gray-200"
      id="mobile-menu"
    >
      <div class="pt-2 pb-3 space-y-1">
        <RouterLink
          @click="toggleMenu"
          to="/"
          class="block px-4 py-2 text-base font-medium text-gray-700 hover:text-pres-blue hover:bg-gray-50"
          active-class="text-pres-blue bg-blue-50 border-l-4 border-pres-blue"
          >Home</RouterLink
        >
        <RouterLink
          @click="toggleMenu"
          to="/directory"
          class="block px-4 py-2 text-base font-medium text-gray-700 hover:text-pres-blue hover:bg-gray-50"
          active-class="text-pres-blue bg-blue-50 border-l-4 border-pres-blue"
          >Directory</RouterLink
        >
        <RouterLink
          @click="toggleMenu"
          to="/projects"
          class="block px-4 py-2 text-base font-medium text-gray-700 hover:text-pres-blue hover:bg-gray-50"
          active-class="text-pres-blue bg-blue-50 border-l-4 border-pres-blue"
          >Projects</RouterLink
        >
        <RouterLink
          @click="toggleMenu"
          to="/media"
          class="block px-4 py-2 text-base font-medium text-gray-700 hover:text-pres-blue hover:bg-gray-50"
          active-class="text-pres-blue bg-blue-50 border-l-4 border-pres-blue"
          >Media</RouterLink
        >
        <div class="border-t border-gray-200 mt-2 pt-3 px-4 flex items-center space-x-6">
        
          <button class="text-gray-500 hover:text-pres-blue transition-colors p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
          </button>

          <button class="text-gray-500 hover:text-pres-blue transition-colors p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
          
        </div>
      </div>
    </div>
  </nav>
</template>
