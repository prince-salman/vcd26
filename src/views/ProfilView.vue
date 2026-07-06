<script setup lang="ts">
const students2026 = [
  "Nadia Ma'rufah", "Stefanie Filia Christie", "Windy Kaillah Effendi", "Felita Althafunnisa",
  "Selma Puan Malika", "Shayna Tannica", "Aletha Hanania", "Nafysa Dhiya Fakhira Prihadi",
  "Annisa Humairoh Hamdani", "Khaila Husna Kamilah", "Fairuz Nissa Kireina", "Joana Brinet Artanti Mawati",
  "Haura Husna Robiyah", "Earliana Puspa Prasetyo", "Nasyifatun Nafsah", "Rindu Melan Agustine",
  "William Manalu", "Andi Aini Kamila Putri A Irdan", "Muhammad Yusuf Saputra", "Naura Syakira Sitanggang",
  "Alesha Ghea Putri Arisandi", "Luna Shula Zahira"
].sort((a, b) => a.localeCompare(b));
</script>

<template>
  <div class="bg-white min-h-screen">
    
    <!-- Visi Misi -->
    <div class="bg-gray-50 py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-8">VCD Department Profile</h1>
        
        <div class="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
          <p class="text-gray-600 text-lg mb-6 leading-relaxed">
            Visual Communication Design at President University uniquely combines strong design fundamentals, emerging media, and Nusantara visual culture, preparing students for global creative industries.
          </p>
          <div class="text-gray-600 mb-6">
            <b class="text-gray-900 mb-2 block">3 key facts:</b>
            <ul class="list-decimal pl-5 space-y-2">
              <li>It is the one from a few VCD programs in Indonesia providing full, free Adobe Creative Cloud access until graduation for each student.</li>
              <li>Students choose two strong concentrations: Graphic Design & Emerging Media or Animation & Game.</li>
              <li>The program emphasizes small classes (25 students) for intensive mentoring and collaboration.</li>
            </ul>
          </div>
          <p class="text-gray-600 text-lg leading-relaxed">
            This major is relevant and future-oriented because it integrates digital technology, new media, and cultural preservation while responding to industry needs. Students gain real-world experience through collaborative projects, industry & museum visits, social projects, exhibitions, and a structured internship program, ensuring strong professional readiness.
          </p>
        </div>
      </div>
    </div>

    <!-- Daftar Dosen -->
    <div class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900">Lecturers</h2>
        <p class="mt-4 text-gray-500">Experts and practitioners ready to guide your creativity.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div class="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
             <img src="https://president.bilinedev.com/uploads/a7018f3e99172180d2a2a99cb6c0e543.png" alt="Remandhia Mulcki" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-lg font-bold text-gray-900">Remandhia Mulcki, S.Sn., M.Ds.</h3>
          <p class="text-sm font-semibold text-blue-600 mb-2">Head of Study Program</p>
          <p class="text-xs text-gray-500">M.Ds., Institut Teknologi Bandung<br>S.Sn., Institut Teknologi Bandung</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div class="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
             <img src="https://president.bilinedev.com/uploads/349ec3ff6a51c6d4217b4d55e0fc4e85.png" alt="Drs. Antonius Mikael Hermanto Laksana" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-lg font-bold text-gray-900">Drs. Antonius Mikael Hermanto Laksana, M.Ikom</h3>
          <p class="text-sm font-semibold text-blue-600 mb-2">Full-Time Lecturer</p>
          <p class="text-xs text-gray-500">M.IKom., Universitas Mercu Buana<br>Drs., Institut Teknologi Bandung</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div class="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
             <img src="https://president.bilinedev.com/uploads/37e6aeab63595e86d308ac29c4dae3cc.png" alt="Lintang Ratna Anindita" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-lg font-bold text-gray-900">Lintang Ratna Anindita, S.Ds, M.Ds</h3>
          <p class="text-sm font-semibold text-blue-600 mb-2">Full-Time Lecturer</p>
          <p class="text-xs text-gray-500">M.Ds., Institut Teknologi Bandung<br>S.Ds., Institut Teknologi Bandung</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div class="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
             <img src="https://president.bilinedev.com/uploads/d90d526164fa495819f0054ef854c52b.png" alt="Rinaldi Aditya Gratama" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-lg font-bold text-gray-900">Rinaldi Aditya Gratama, S.Ds., MAB</h3>
          <p class="text-sm font-semibold text-blue-600 mb-2">Full-Time Lecturer</p>
          <p class="text-xs text-gray-500">MAB, Institut Teknologi Bandung<br>S.Ds., Institut Teknologi Bandung</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div class="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
             <img src="https://president.bilinedev.com/uploads/5fecc178c60235b8e378b0eefafd1baa.png" alt="Vivianty Hartono" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-lg font-bold text-gray-900">Vivianty Hartono, S.Ds., M.Ds</h3>
          <p class="text-sm font-semibold text-blue-600 mb-2">Full-Time Lecturer</p>
          <p class="text-xs text-gray-500">M.Ds., Institut Teknologi Bandung<br>S.Ds., President University</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div class="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
             <img src="https://president.bilinedev.com/uploads/a8df9d74b03134790b59908f0ac45b0f.png" alt="Fransiska Rachel" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-lg font-bold text-gray-900">Fransiska Rachel, S.Sn., M.Ds.</h3>
          <p class="text-sm font-semibold text-blue-600 mb-2">Full-Time Lecturer</p>
          <p class="text-xs text-gray-500">Dr. (cand.), Institut Teknologi Bandung<br>M.Ds., Institut Teknologi Bandung<br>S.Sn., Institut Teknologi Bandung</p>
        </div>

      </div>
    </div>

    <!-- Daftar Mahasiswa -->
    <div class="bg-gray-50 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900">VCD Batch 2026</h2>
          <p class="mt-4 text-gray-500">The creative minds behind the designs.</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="(student, index) in students2026" :key="index" class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-center hover:shadow-md transition-shadow">
            <span class="font-medium text-gray-800 text-sm md:text-base">{{ student }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
