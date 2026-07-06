<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { supabase } from './lib/supabase.ts'
void supabase
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
    <Navbar />
    
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
  </div>
</template>

<style>
/* Transitions are defined in style.css */
</style>