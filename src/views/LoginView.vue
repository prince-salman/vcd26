<template>
  <div class="h-[calc(100vh-64px)] flex bg-white overflow-hidden">
    <div class="flex-1 flex flex-col justify-center px-10 lg:px-20 xl:px-32 bg-white">
      <div class="w-full max-w-md mx-auto">
        <div class="mb-8">
          <div class="mb-8">
            <img src="/logo.png" alt="Logo PU" class="w-16 h-16 object-contain" />
          </div>
        </div>

        <h1 class="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
        <p class="text-gray-500 mb-8">Enter your credentials to access your account.</p>
        <p v-if="errorMessage" class="mb-4 text-sm text-red-500">{{ errorMessage }}</p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              v-model="email" 
              type="email" 
              required
              placeholder="name@example.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="text-sm font-medium text-gray-700">Password</label>
              <a href="#" class="text-sm text-blue-600 hover:underline">Forgot?</a>
            </div>
            <input 
              v-model="password" 
              type="password" 
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-500 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl">
            {{ loading ? "Logging in..." : "Login" }}
            </button>
        </form>
      </div>
    </div>

    <div class="hidden lg:block w-1/2 p-6 lg:p-8 h-full pt-6 pb-4">
      <div class="relative w-full h-full overflow-hidden rounded-3xl shadow-xl bg-gray-100">
        <img 
          src="/gedung-pu.png" 
          alt="Computer Science Building" 
          class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/10"></div> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, getUserRole } from "../services/authService";

const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";

  const { data, error } = await login(email.value, password.value);

  if (error) {
    errorMessage.value = error.message;
    loading.value = false;
    return;
  }

  if (data.user) {
      const role = await getUserRole(data.user.id);

      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    }

  loading.value = false;
};
</script>