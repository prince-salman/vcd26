<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)

const togglePlay = () => {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause()
    } else {
      audioRef.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

onMounted(() => {
  if (audioRef.value) {
    // Set initial volume if desired
    audioRef.value.volume = 0.5
    
    // Add event listeners to sync state
    audioRef.value.addEventListener('play', () => isPlaying.value = true)
    audioRef.value.addEventListener('pause', () => isPlaying.value = false)
    audioRef.value.addEventListener('ended', () => isPlaying.value = false)
  }
})
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Ganti source src dengan path lagu Anda, misalnya /music/bgm.mp3 -->
    <audio ref="audioRef" src="" loop preload="auto"></audio>
    
    <button 
      @click="togglePlay"
      class="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg text-gray-800 hover:text-blue-600 hover:bg-gray-50 focus:outline-none transition-all transform hover:scale-105"
      :aria-label="isPlaying ? 'Pause Music' : 'Play Music'"
    >
      <svg v-if="!isPlaying" class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
      </svg>
      <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>
