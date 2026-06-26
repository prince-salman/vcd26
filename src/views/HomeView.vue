<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative bg-pres-dark text-white overflow-hidden">
      <div class="absolute inset-0">
        <img class="w-full h-full object-cover blur-sm scale-105" src="/gedung-baru.png" alt="President University Building" />
        <div class="absolute inset-0 bg-pres-dark/50" />
      </div>
      <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
          Information Technology
        </h1>
        <p class="mt-6 text-xl max-w-3xl text-white">
          Batch 2026 • President University
        </p>
        <p class="mt-4 text-lg max-w-2xl text-white">
          Empowering the future through technology, innovation, and leadership. Discover our journey, our projects, and our people.
        </p>
        <div class="mt-10 flex space-x-4">
          <RouterLink to="/directory" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pres-red hover:bg-red-800 transition-colors">
            Meet the Batch
          </RouterLink>
          <RouterLink to="/projects" class="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-pres-dark transition-colors">
            View Projects
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Core Values / Highlights -->
    <div class="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-base font-semibold text-pres-red tracking-wide uppercase">Our Vision</h2>
        <p class="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
          Shaping the Digital World
        </p>
        <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
          We are a community of passionate developers, designers, and engineers dedicated to solving real-world problems.
        </p>
      </div>

      <div class="mt-16">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div class="pt-6">
            <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div class="-mt-6">
                <div>
                  <span class="inline-flex items-center justify-center p-3 bg-pres-red rounded-md shadow-lg">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </span>
                </div>
                <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">Technical Excellence</h3>
                <p class="mt-5 text-base text-gray-500">
                  Mastering modern frameworks, algorithms, and software architectures to build robust solutions.
                </p>
              </div>
            </div>
          </div>

          <div class="pt-6">
            <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div class="-mt-6">
                <div>
                  <span class="inline-flex items-center justify-center p-3 bg-pres-red rounded-md shadow-lg">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                </div>
                <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">Innovation First</h3>
                <p class="mt-5 text-base text-gray-500">
                  Pushing boundaries and adopting cutting-edge technologies to stay ahead of the curve.
                </p>
              </div>
            </div>
          </div>

          <div class="pt-6">
            <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div class="-mt-6">
                <div>
                  <span class="inline-flex items-center justify-center p-3 bg-pres-red rounded-md shadow-lg">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                </div>
                <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">Strong Community</h3>
                <p class="mt-5 text-base text-gray-500">
                  Collaborating, learning together, and building a supportive network that lasts beyond graduation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
