<script setup lang="ts">
import { ref, computed } from 'vue'
import studentsData from '../data/dataMahasiswa.json'
import { currentLang, translations } from '../store/langStore'

interface Student {
  nim: string
  name: string
  major: string
  batch: number
  specialization: string
  skills: string[]
  github_username: string
}

// Convert JSON data to ref
const students = ref<Student[]>(studentsData as Student[])

const searchQuery = ref('')

// filter
const filteredStudents = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return students.value

  return students.value.filter(student =>
    student.name?.toLowerCase().includes(query) ||
    student.nim?.includes(query) ||
    student.major?.toLowerCase().includes(query) ||
    student.specialization?.toLowerCase().includes(query) ||
    (student.skills && student.skills.some(skill => skill.toLowerCase().includes(query)))
  )
})
</script>

<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">{{ translations[currentLang].dirTitle }}</h1>
      <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
        {{ translations[currentLang].dirSubtitle }}
      </p>
    </div>

    <div class="max-w-md mx-auto mb-12 ">
      <div class="rounded-md shadow-sm ">
        <input v-model="searchQuery" type="text" placeholder="{{ translations[currentLang].dirSearchPlaceholder }}"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pres-blue focus:border-pres-blue shadow-sm transition ease-in-out duration-150 text-gray-900 outline-none" />
      </div>
    </div>

    <div v-if="filteredStudents.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="student in filteredStudents" :key="student.nim"
        class="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
        <div class="p-6">
          <div class="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-900 capitalize">{{ student.name }}</h3>
              <p class="text-sm text-gray-500 font-mono">NIM: {{ student.nim }}</p>
            </div>
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-pres-blue">
              Batch {{ student.batch }}
            </span>
          </div>

          <div class="space-y-2 text-sm text-gray-600 mb-4">
            <p v-if="student.specialization">
              <span class="font-semibold text-gray-700">Specialization:</span> {{ student.specialization }}
            </p>
          </div>

          <div v-if="student.skills && student.skills.length > 0">
            <span class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills:</span>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="skill in student.skills" :key="skill"
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <a v-if="student.github_username" :href="`https://github.com/${student.github_username}`" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center text-sm font-medium text-pres-blue hover:text-blue-800 transition-colors duration-150">
            <svg class="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.095.069-.095 1.005.074 1.531 1.034 1.531 1.034.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd" />
            </svg>
            <span>{{ student.github_username }}</span>
          </a>
          <span v-else class="text-sm text-gray-400 italic">No GitHub provided</span>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-lg text-gray-500">No students found matching your search.</p>
    </div>
  </div>
</template>
