<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';
import { logout } from '../services/authService'; 
import { computed } from 'vue';
import directoryData from '../data/dataMahasiswa.json';
import { currentLang, translations } from '../store/langStore'
// import projectsData from '../data/projects.json'; 
// import mediaData from '../data/media.json';

const router = useRouter();
const isMenuOpen = ref(false); 
const isLoggedIn = ref(false); 
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);
const isSearchOpen = ref(false);
const searchQuery = ref('');
const isLangDropdownOpen = ref(false)

const setLanguage = (lang: string) => {
  currentLang.value = lang
  isLangDropdownOpen.value = false
}

// dummy sementara nunggu
const projectsData = [
  { id: 1, title: 'Web Absensi', desc: 'Sistem absensi online' },
  { id: 2, title: 'Aplikasi Kasir', desc: 'POS system' }
];
const mediaData = [
  { id: 1, title: 'Tutorial Vue 3', type: 'Video' },
  { id: 2, title: 'Belajar Tailwind', type: 'Artikel' }
];

const dashboardLink = computed(() => {
  const role = localStorage.getItem('user_role');
  return role === 'admin' ? '/admin' : '/user';
});

const searchResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) {
    return { directory: [], projects: [], media: [] };
  }

  const filteredDirectory = directoryData.filter((item: any) => 
    item.name?.toLowerCase().includes(query) || 
    (item.skills && item.skills.some((s: string) => s.toLowerCase().includes(query)))
  ).slice(0, 3);

  const filteredProjects = projectsData.filter((item: any) => 
    item.name?.toLowerCase().includes(query)
  ).slice(0, 3);

  const filteredMedia = mediaData.filter((item: any) => 
    item.name?.toLowerCase().includes(query)
  ).slice(0, 3);

  return {
    directory: filteredDirectory,
    projects: filteredProjects,
    media: filteredMedia
  }
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Fungsi Logout
const handleLogout = async () => {
  isDropdownOpen.value = false;
  
  // 1. Logout dari backend
  await logout(); 
  
  // 2. Set state ke false
  isLoggedIn.value = false;
  
  await router.push('/');
  window.location.reload(); 
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const profileButton = document.querySelector('.profile-btn'); 
  
  if (
    (dropdownRef.value && (dropdownRef.value as any).contains(event.target)) || 
    (profileButton && profileButton.contains(event.target as Node))
  ) {
    return;
  }
  
  closeDropdown();
};

onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  isLoggedIn.value = !!data.session;

  supabase.auth.onAuthStateChange((_event, session) => {
    isLoggedIn.value = !!session;
  });

  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <nav class="bg-white sticky top-0 z-50 border-b-8 border-pres-red">
    <div class="max-w-full mx-auto px-4 lg:px-4">
      <div class="flex items-center justify-between w-full h-18">
        <div class="flex flex-1 items-center">
          <RouterLink to="/" class="shrink-0 flex items-center -mb-2">
            <img src="/logo.png" alt="IT Logo" class="h-10 w-auto -mt-2" />
          </RouterLink>

          <button 
            @click = 'isSearchOpen = true'
            class="hidden sm:flex items-center text-gray-500 hover:text-pres-blue px-2 py-1.5 text-sm transition-colors font-medium mt-1 ml-4"
          >
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
            >{{ translations[currentLang].directory }}</RouterLink
          >
          <RouterLink
            to="/projects"
            class="text-gray-700 hover:text-pres-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-pres-blue font-semibold"
            >{{ translations[currentLang].projects }}</RouterLink
          >
          <RouterLink
            to="/media"
            class="text-gray-700 hover:text-pres-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-pres-blue font-semibold"
            >{{ translations[currentLang].media }}</RouterLink
          >
        </div>

        <div class="flex-1 flex justify-end items-center space-x-4">
  
          <div class="relative">
            <button
              @click="isLangDropdownOpen = !isLangDropdownOpen"
              class="text-gray-500 hover:text-blue-600 transition block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </button>

            <div 
              v-if="isLangDropdownOpen" 
              class="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50 text-xs text-gray-700"
            >
              <button @click="setLanguage('en')" class="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors">English</button>
              <button @click="setLanguage('id')" class="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors">Indonesia</button>
              <button @click="setLanguage('zh')" class="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors">Chinese</button>
              <button @click="setLanguage('ko')" class="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors">Korean</button>
            </div>
          </div>

          <div class="h-6 w-px bg-gray-300"></div>

          <div v-if="!isLoggedIn" class="hidden sm:flex items-center gap-3">
            <button 
              @click="router.push('/login')"
              class="text-sm font-semibold text-gray-600 hover:text-blue-600 transition px-3"
            >
              {{ translations[currentLang].login }}
            </button>
          </div>

          <div v-else class="relative">
            <button 
              @click="isDropdownOpen = !isDropdownOpen" 
              class="flex profile-btn items-center focus:outline-none transition-transform hover:scale-105"
            >
              <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border border-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </button>

            <div 
              v-if="isDropdownOpen" 

              class="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200"
            >
              <RouterLink 
                :to="dashboardLink" 
                @click="closeDropdown" 
                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
              >
                My Dashboard
              </RouterLink>
              <button 
                @click="handleLogout" 
                class="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>


        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden space-x-2">
          <button @click="isSearchOpen = true" class="text-gray-500 hover:text-pres-blue p-2 transition-colors">
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
        <div v-if="!isLoggedIn" class="flex flex-col gap-3 w-full mt-2">
          <button 
            @click="() => {
              router.push('/login');
              isMenuOpen = false;
            }"
            class="w-full text-center text-gray-600 font-medium border border-gray-300 px-5 py-2 rounded-lg hover:text-blue-600 transition-colors"
          >
            Log in
          </button>
        </div>

        <button 
          v-else
          @click="handleLogout()"
          class="w-full mt-2 text-gray-500 hover:text-red-600 font-medium transition-colors border border-gray-300 px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>

  <div 
    v-if="isSearchOpen" 
    class="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-gray-900/50 backdrop-blur-sm"
    @click.self="isSearchOpen = false"
  >
    <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col mx-4">
      
      <div class="flex items-center px-4 py-4 border-b border-gray-100">
        <svg class="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search directory, projects, media..." 
          class="flex-1 bg-transparent text-gray-800 text-lg focus:outline-none placeholder-gray-400"
          autofocus
        />
        <button @click="isSearchOpen = false" class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
          ESC
        </button>
      </div>

      <div 
        v-if="isSearchOpen" 
        class="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-gray-900/50 backdrop-blur-sm"
        @click.self="isSearchOpen = false"
      >
        <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col mx-4">
          
          <div class="flex items-center px-4 py-4 border-b border-gray-100">
            <svg class="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search directory, projects, media..." 
              class="flex-1 bg-transparent text-gray-800 text-lg focus:outline-none placeholder-gray-400"
              autofocus
            />
            <button @click="isSearchOpen = false" class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition">
              ESC
            </button>
          </div>

          <div class="p-4 max-h-[60vh] overflow-y-auto">
            
            <div v-if="!searchQuery" class="text-sm text-gray-400 text-center py-8">
              Ketik sesuatu untuk mulai mencari di Directory, Projects, atau Media.
            </div>

            <div v-else-if="searchResults.directory.length === 0 && searchResults.projects.length === 0 && searchResults.media.length === 0" class="text-sm text-gray-500 text-center py-8">
              Tidak menemukan apapun untuk "<span class="font-semibold text-gray-800">{{ searchQuery }}</span>"
            </div>

            <div v-else class="space-y-6">
              
              <div v-if="searchResults.directory.length > 0">
                <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Directory</h3>
                <ul class="space-y-1">
                  <li v-for="student in searchResults.directory" :key="student.nim">
                    <a href="#" class=" px-3 py-2 rounded-lg hover:bg-blue-50 transition flex justify-between items-center group">
                      <div>
                        <div class="text-sm font-medium text-gray-800 group-hover:text-blue-700">{{ student.name }}</div>
                        <div class="text-xs text-gray-500">{{ student.nim }}</div>
                      </div>
                      <span class="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition">Lihat &rarr;</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div v-if="searchResults.projects.length > 0">
                <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Projects</h3>
                <ul class="space-y-1">
                  <li v-for="project in searchResults.projects" :key="project.id">
                    <a href="#" class="block px-3 py-2 rounded-lg hover:bg-blue-50 transition group">
                      <div class="text-sm font-medium text-gray-800 group-hover:text-blue-700">{{ project.title }}</div>
                      <div class="text-xs text-gray-500">{{ project.desc }}</div>
                    </a>
                  </li>
                </ul>
              </div>

              <div v-if="searchResults.media.length > 0">
                <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Media</h3>
                <ul class="space-y-1">
                  <li v-for="media in searchResults.media" :key="media.id">
                    <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 transition group">
                      <svg class="w-4 h-4 text-gray-400 mr-2 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <div class="text-sm font-medium text-gray-800 group-hover:text-blue-700">{{ media.title }}</div>
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
