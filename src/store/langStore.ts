import { ref, watch } from 'vue'

const savedLang = localStorage.getItem('preferredLanguage') || 'en'

export const currentLang = ref<string>(savedLang)

watch(currentLang, (newLang: string) => {
  localStorage.setItem('preferredLanguage', newLang)
})

export const translations: Record<string, Record<string, string>> = {
  en: {
    home: 'Home',
    directory: 'Directory',
    projects: 'Projects',
    media: 'Media',
    login: 'Log in',
    dashboardTitle: 'User Dashboard',
    welcome: 'Welcome',
    myProjects: 'My Projects',
    addNewProject: 'Add New Project',
    status: 'Status',
    action: 'Actions',
    heroTitle: 'Information Technology',
    heroSubtitle: 'Batch 2026 • President University',
    heroDesc: 'Empowering the future through technology, innovation, and leadership. Discover our journey, our projects, and our people.',
    btnMeet: 'Meet the Batch',
    btnView: 'View Projects',
    visionLabel: 'OUR VISION',
    visionTitle: 'Shaping the Digital World',
    visionDesc: 'We are a community of passionate developers, designers, and engineers dedicated to solving real-world problems.',
    card1Title: 'Technical Excellence',
    card1Desc: 'Mastering modern frameworks, algorithms, and software architectures to build robust solutions.',
    card2Title: 'Innovation First',
    card2Desc: 'Pushing boundaries and adopting cutting-edge technologies to stay ahead of the curve.',
    card3Title: 'Strong Community',
    card3Desc: 'Collaborating, learning together, and building a supportive network that lasts beyond graduation.',
    dirTitle: 'Student Directory',
    dirSubtitle: 'Explore the profiles and portfolios of Information Technology batch 2026 students.',
    dirSearchPlaceholder: 'Type to search (Name, NIM, Skill)...',
    
    projTitle: 'Our Projects',
    
    mediaTitle: 'Media Gallery',
    mediaSubtitle: 'A collection of event documentation and memories of IT Batch 2026.'
  },
  id: {
    home: 'Beranda',
    directory: 'Direktori',
    projects: 'Proyek',
    media: 'Media',
    login: 'Masuk',
    dashboardTitle: 'Dasbor Pengguna',
    welcome: 'Selamat Datang',
    myProjects: 'Proyek Saya',
    addNewProject: 'Tambah Proyek Baru',
    status: 'Status',
    action: 'Aksi',
    heroTitle: 'Teknologi Informasi',
    heroSubtitle: 'Angkatan 2026 • President University',
    heroDesc: 'Memberdayakan masa depan melalui teknologi, inovasi, dan kepemimpinan. Temukan perjalanan kami, proyek kami, dan komunitas kami.',
    btnMeet: 'Temui Angkatan',
    btnView: 'Lihat Proyek',
    visionLabel: 'VISI KAMI',
    visionTitle: 'Membentuk Dunia Digital',
    visionDesc: 'Kami adalah komunitas pengembang, desainer, dan insinyur penuh semangat yang berdedikasi untuk memecahkan masalah dunia nyata.',
    card1Title: 'Keunggulan Teknis',
    card1Desc: 'Mengusai framework modern, algoritma, dan arsitektur perangkat lunak untuk membangun solusi yang tangguh.',
    card2Title: 'Inovasi Utama',
    card2Desc: 'Menembus batas dan mengadopsi teknologi mutakhir untuk tetap menjadi yang terdepan.',
    card3Title: 'Komunitas yang Kuat',
    card3Desc: 'Berkolaborasi, belajar bersama, dan membangun jaringan suportif yang bertahan melampaui kelulusan.',
    dirTitle: 'Direktori Mahasiswa',
    dirSubtitle: 'Jelajahi profil dan portofolio mahasiswa Information Technology angkatan 2026.',
    dirSearchPlaceholder: 'Ketik untuk mencari (Nama, NIM, Keahlian)...',
    
    projTitle: 'Proyek Kami',
    
    mediaTitle: 'Galeri Media',
    mediaSubtitle: 'Kumpulan dokumentasi kegiatan dan memori IT Batch 2026.'
  },
  zh: {
    home: '首页',
    directory: '名录',
    projects: '项目',
    media: '媒体',
    login: '登录',
    dashboardTitle: '用户仪表板',
    welcome: '欢迎',
    myProjects: '我的项目',
    addNewProject: '添加新项目',
    status: '状态',
    action: '操作',
    heroTitle: '信息技术', heroSubtitle: '2026届 • 总统大学', heroDesc: '通过技术、创新和领导力赋能未来。探索我们的历程、项目和团队。',
    btnMeet: '认识团队', btnView: '查看项目', visionLabel: '我们的愿景', visionTitle: '塑造数字世界',
    visionDesc: '我们是一个由充满热情的开发人员、设计师和工程师组成的 community，致力于解决现实世界的问题。',
    card1Title: '卓越技术', card1Desc: '掌握现代框架、算法和软件架构,以构建强大的解决方案。',
    card2Title: '创新第一', card2Desc: '突破界限并采用尖端技术,保持领先地位。',
    card3Title: '强大的社区', card3Desc: '通力合作、共同学习,并建立一个延续到毕业以后的支持性网络。',
    dirTitle: '学生名录',
    dirSubtitle: '探索 2026 届信息技术专业学生的个人资料和作品集。',
    dirSearchPlaceholder: '输入以搜索 (姓名, 学号, 技能)...',
    
    projTitle: '我们的项目',
    
    mediaTitle: '媒体库',
    mediaSubtitle: '2026 届 IT 专业活动记录与回忆集锦。'
  },
  ko: {
    home: '홈',
    directory: '디렉토리',
    projects: '프로젝트',
    media: '미디어',
    login: '로그인',
    dashboardTitle: '사용자 대시보드',
    welcome: '환영합니다',
    myProjects: '내 프로젝트',
    addNewProject: '새 프로젝트 추가',
    status: '상태',
    action: '작업',
    heroTitle: '정보 기술', heroSubtitle: '2026 학번 • 프레지던트 대학교', heroDesc: '기술, 혁신, 리더십을 통해 미래를 주도합니다. 우리의 여정, 프로젝트, 그리고 사람들을 만나보세요.',
    btnMeet: '동기들 만나기', btnView: '프로젝트 보기', visionLabel: '우리의 비전', visionTitle: '디지털 세계를 형성하다',
    visionDesc: '우리는 실제 문제를 해결하기 위해 헌신하는 열정적인 개발자, 디자이너, 엔지니어들의 커뮤니티입니다.',
    card1Title: '기술적 탁월함', card1Desc: '최신 프레임워크, 알고리즘, 소프트웨어 아키텍처를 마스터하여 견고한 솔루션을 구축합니다.',
    card2Title: '혁신 우선', card2Desc: '한계를 뛰어넘고 최첨단 기술을 도입하여 앞서 나갑니다.',
    card3Title: '강력한 커뮤니티', card3Desc: '협력하고 함께 배우며, 졸업 후에도 지속되는 지원 네트워크를 형성합니다.',
    dirTitle: '학생 디렉토리',
    dirSubtitle: '2026 학번 정보 기술 학생들의 프로필과 포트폴리오를 탐색해보세요.',
    dirSearchPlaceholder: '검색어 입력 (이름, 학번, 기술)...',
    
    projTitle: '우리의 프로젝트',
    
    mediaTitle: '미디어 갤러리',
    mediaSubtitle: 'IT 2026 학번의 행사 기록 및 추억 모음.'
  }
}