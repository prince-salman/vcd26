<script setup lang="ts">
import { ref } from 'vue';
import directoryData from '../data/dataMahasiswa.json';

const students = ref([...directoryData].sort((a: any, b: any) => a.name.localeCompare(b.name)));
const searchQuery = ref('');

// Filter sederhana
const filteredStudents = () => {
  if (!searchQuery.value) return students.value;
  const q = searchQuery.value.toLowerCase();
  return students.value.filter((s: any) => 
    s.name.toLowerCase().includes(q) || s.nim.includes(q)
  );
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">VCD Student Data</h1>
        <p class="mt-4 text-lg text-gray-500">Active student directory of Visual Communication Design class of 2026.</p>
      </div>

      <div class="mb-8 max-w-md mx-auto">
        <div class="relative rounded-md shadow-sm">
          <input 
            type="text" 
            v-model="searchQuery" 
            class="focus:ring-gray-900 focus:border-gray-900 block w-full pr-10 sm:text-sm border-gray-300 rounded-md py-3 px-4" 
            placeholder="Search name or NIM..."
          />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="student in filteredStudents()" :key="student.nim" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div class="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
             <!-- Placeholder image -->
             <svg class="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900">{{ student.name }}</h3>
          <p class="text-sm text-gray-500 mb-4">{{ student.nim }}</p>
          <div class="flex flex-wrap gap-2 justify-center">
            <span v-for="skill in student.skills" :key="skill" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
