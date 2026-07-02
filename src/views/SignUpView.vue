<!-- <template>
  <div class="h-[calc(100vh-64px)] flex bg-white overflow-hidden relative">
    
    <div class="flex-1 flex flex-col justify-center px-10 lg:px-20 xl:px-32 bg-white overflow-y-auto py-10">
      <div class="w-full max-w-md mx-auto">
        <div class="mb-6">
          <img src="/logo.png" alt="Logo PU" class="w-16 h-16 object-contain" />
        </div>

        <h1 class="text-3xl font-bold text-gray-900 mb-2">Create an Account</h1>
        <p class="text-gray-500 mb-6">Join us to showcase your best IT projects.</p>
        
        <p v-if="errorMessage" class="mb-4 text-sm text-red-500">{{ errorMessage }}</p>

        <form @submit.prevent="handleSignUp" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input v-model="form.fullName" type="text" required placeholder="John Doe" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input v-model="form.username" type="text" required placeholder="johndoe123" 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
              <input v-model="form.birthDate" type="date" required 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" required placeholder="name@example.com" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input v-model="form.password" type="password" required placeholder="••••••••" 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirm</label>
              <input v-model="form.confirmPassword" type="password" required placeholder="••••••••" 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
                {{ errorMessage }}
              </p>
            </div>
          </div>

          <button type="submit" :disabled="loading" 
            class="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-500 text-white font-semibold py-3 rounded-lg mt-2 transition">
            {{ loading ? "Creating account..." : "Sign Up" }}
          </button>
        </form>
        
        <p class="text-center text-sm text-gray-500 mt-6">
          Already have an account? 
          <router-link to="/login" class="text-blue-600 hover:underline font-medium">Log in</router-link>
        </p>
      </div>
    </div>

    <div class="hidden lg:block w-1/2 p-6 lg:p-8 h-full pt-6 pb-4">
      <div class="relative w-full h-full overflow-hidden rounded-3xl shadow-xl bg-gray-100">
        <img src="/gedung-pu.png" alt="Computer Science Building" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/10"></div>
      </div>
    </div>

<div v-if="isVerificationModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center relative">
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
    
    <div class="email-instruction py-4">
      <p class="text-gray-600 mb-4">Verification link have been sent to <b>{{ form.email }}</b>.</p>
      <button @click="openEmailProvider" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Open Gmail
      </button>
    </div>
    
    <button @click="isVerificationModalOpen = false" class="mt-4 text-sm text-gray-500 hover:text-gray-800">Cancel</button>
  </div>
</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { signUp } from '../services/authService'

const form = reactive({
  fullName: '',
  username: '',
  birthDate: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const errorMessage = ref("")

const isVerificationModalOpen = ref(false);

const handleSignUp = async () => {
  errorMessage.value = '';

  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Kata sandi tidak cocok. Mohon periksa kembali.';
    return;
  }

  const { error } = await signUp(
    form.email, 
    form.password, 
    form.fullName, 
    form.username, 
    form.birthDate
  );
  
  if (!error) {
    // PANGGIL INI
    isVerificationModalOpen.value = true; 
  } else {
    errorMessage.value = error.message;
  }
}

const openEmailProvider = () => {
  const emailDomain = form.email.split('@')[1]; 
  window.open(`https://${emailDomain}`, '_blank');
};
</script> -->