<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';
import { logout, getUserRole } from '../services/authService'; 

const router = useRouter();
const isMenuOpen = ref(false); 
const isLoggedIn = ref(false); 
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const userRole = ref<string | null>(null);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/profil' },
  { name: 'Academics', path: '/akademik' },
  { name: 'Students', path: '/mahasiswa' },
  { name: 'Gallery', path: '/galeri' },
  { name: 'Commission', path: '/commission' },
  { name: 'News', path: '/news' },
  { name: 'Contact', path: '/kontak' },
];

const dashboardLink = computed(() => {
  return userRole.value === 'admin' ? '/admin' : '/user';
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleLogout = async () => {
  isDropdownOpen.value = false;
  localStorage.removeItem('user_role'); // Bersihkan sisa mock
  await logout(); 
  isLoggedIn.value = false;
  userRole.value = null;
  await router.push('/');
  window.location.reload(); 
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const profileButton = document.querySelector('.profile-btn'); 
  
  if (
    (dropdownRef.value && dropdownRef.value.contains(event.target as Node)) || 
    (profileButton && profileButton.contains(event.target as Node))
  ) {
    return;
  }
  
  closeDropdown();
};

onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    isLoggedIn.value = true;
    userRole.value = await getUserRole(data.session.user.id);
  } else {
    isLoggedIn.value = false;
  }

  supabase.auth.onAuthStateChange(async (_event, session) => {
    isLoggedIn.value = !!session;
    if (session) {
      userRole.value = await getUserRole(session.user.id);
    } else {
      userRole.value = null;
    }
  });

  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <nav class="bg-white sticky top-0 z-50 border-b-4 border-gray-900 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo Area -->
        <div class="flex-shrink-0 flex items-center">
          <RouterLink to="/" class="flex items-center gap-3 group">
            <img src="https://fada.president.ac.id/themev2/images/fada/logo-frame-pu-fada-text-landscape.png" alt="Logo FADA" class="w-10 h-10 object-cover object-left" />
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex flex-1 justify-center items-center space-x-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200"
            active-class="text-gray-900 bg-gray-100"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <!-- Right Side (Auth) -->
        <div class="hidden lg:flex flex-shrink-0 items-center justify-end">
          <div v-if="!isLoggedIn" class="flex items-center gap-4">
            <button 
              @click="router.push('/login')"
              class="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Login
            </button>
          </div>

          <div v-else class="relative" ref="dropdownRef">
            <button 
              @click="isDropdownOpen = !isDropdownOpen" 
              class="profile-btn flex items-center focus:outline-none transition-transform hover:scale-105"
            >
              <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 hover:border-gray-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </button>

            <!-- Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div 
                v-if="isDropdownOpen" 
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50"
              >
                <RouterLink 
                  :to="dashboardLink" 
                  @click="closeDropdown" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </RouterLink>
                <button 
                  @click="handleLogout" 
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                >
                  Logout
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center lg:hidden">
          <button
            @click="toggleMenu"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 transition-colors"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg v-if="!isMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-in-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-screen opacity-100"
      leave-active-class="transition-all duration-300 ease-in-out"
      leave-from-class="max-h-screen opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-show="isMenuOpen" class="lg:hidden border-t border-gray-200 bg-white overflow-hidden" id="mobile-menu">
        <div class="pt-2 pb-3 space-y-1 px-4">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            @click="toggleMenu"
            :to="link.path"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            active-class="text-gray-900 bg-gray-100"
          >
            {{ link.name }}
          </RouterLink>
          
          <div class="border-t border-gray-200 pt-4 mt-4">
            <div v-if="!isLoggedIn" class="flex flex-col gap-2">
              <button 
                @click="() => { router.push('/login'); isMenuOpen = false; }"
                class="w-full text-center text-white bg-gray-900 font-medium px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            </div>
            <div v-else class="flex flex-col gap-2">
              <RouterLink 
                :to="dashboardLink"
                @click="toggleMenu"
                class="w-full text-center text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors border border-gray-200"
              >
                Dashboard
              </RouterLink>
              <button 
                @click="handleLogout"
                class="w-full text-center text-red-600 font-medium px-4 py-2 rounded-md hover:bg-red-50 transition-colors border border-red-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
