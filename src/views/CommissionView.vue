<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCommissions } from '../services/dataService'

const commissions = ref<any[]>([]);

onMounted(async () => {
  commissions.value = await getCommissions()
})
</script>

<template>
  <div class="bg-white min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col mb-12 border-b border-gray-200 pb-6">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Commission Art</h1>
        <p class="text-lg text-gray-500">A platform for design and illustration commission services by VCD students.</p>
      </div>

      <!-- Market List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in commissions" :key="item.id" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
          <div class="absolute top-4 right-4">
            <span v-if="item.available" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Open
            </span>
            <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Closed
            </span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-1">{{ item.name }}</h3>
          <p class="text-sm font-medium text-gray-500 mb-4">{{ item.focus }}</p>
          <div class="space-y-2 mb-6">
            <p class="text-sm text-gray-700"><span class="font-bold">Price:</span> {{ item.price }}</p>
            <p class="text-sm text-gray-700"><span class="font-bold">Contact:</span> {{ item.contact }}</p>
          </div>
          <button class="w-full border border-gray-900 text-gray-900 font-medium py-2 rounded-md hover:bg-gray-900 hover:text-white transition-colors">
            Contact Creator
          </button>
        </div>
        
        <div v-if="commissions.length === 0" class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500">
          No commission providers available currently.
        </div>
      </div>
    </div>
  </div>
</template>
