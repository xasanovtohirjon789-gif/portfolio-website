import { create } from 'zustand'

export interface Project {
  id: string
  title: string
  description: string
  image: string | null
  category: string
  technologies: string[]
  liveUrl: string | null
  githubUrl: string | null
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon: string | null
  order: number
}

export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  avatar: string | null
  email: string | null
  phone: string | null
  location: string | null
  website: string | null
  github: string | null
  linkedin: string | null
  twitter: string | null
  telegram: string | null
  resumeUrl: string | null
}

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc'

interface PortfolioState {
  // Projects
  projects: Project[]
  filteredProjects: Project[]
  selectedCategory: string
  sortOption: SortOption
  searchQuery: string
  
  // Skills
  skills: Skill[]
  
  // Profile
  profile: Profile | null
  
  // UI State
  isLoading: boolean
  isAdmin: boolean
  activeSection: string
  
  // Actions
  setProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  
  setSkills: (skills: Skill[]) => void
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  deleteSkill: (id: string) => void
  
  setProfile: (profile: Profile | null) => void
  
  setCategory: (category: string) => void
  setSortOption: (option: SortOption) => void
  setSearchQuery: (query: string) => void
  filterAndSortProjects: () => void
  
  setIsAdmin: (isAdmin: boolean) => void
  setActiveSection: (section: string) => void
  setIsLoading: (isLoading: boolean) => void
}

// Profile - o'z ma'lumotlaringizni kiriting
const demoProfile: Profile = {
  id: '1',
  name: 'Tohirjon Xasanov',
  title: 'Full Stack Developer',
  bio: 'Zamonaviy veb ilovalar yaratishga qiziqaman. React, Next.js, Node.js va boshqa texnologiyalarda tajribam bor.',
  avatar: null,
  email: 'xasanovtohirjon89@gmail.com',
  phone: '+998333234535',
  location: 'Toshkent, O\'zbekiston',
  website: null,
  github: 'https://github.com/xasanovtohirjon789-gif',
  linkedin: null,
  twitter: null,
  telegram: '@khasanov_326',
  resumeUrl: null,
}

// Loyihalar ro'yxati
const demoProjects: Project[] = [
  {
    id: '1',
    title: 'TestAI - AI Test Generator',
    description: 'Sun\'iy intellekt yordamida test savollari generatsiya qiluvchi zamonaviy veb ilova. Foydalanuvchilar fan tanlab, test turi va savollar sonini belgilab, AI orqali sifatli test savollarini yaratishi mumkin. Next.js 16, TypeScript va Tailwind CSS da yaratilgan.',
    image: null,
    category: 'web',
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'AI/LLM'],
    liveUrl: 'https://aitestlar.netlify.app',
    githubUrl: 'https://github.com/xasanovtohirjon789-gif/testai-platform',
    featured: true,
    createdAt: '2025-03-15',
    updatedAt: '2025-03-18',
  },
]

// Ko'nikmalar - o'z ko'nikmalaringizni kiriting
const demoSkills: Skill[] = [
  // Frontend
  { id: '1', name: 'React', level: 80, category: 'frontend', icon: null, order: 1 },
  { id: '2', name: 'Next.js', level: 75, category: 'frontend', icon: null, order: 2 },
  { id: '3', name: 'TypeScript', level: 70, category: 'frontend', icon: null, order: 3 },
  { id: '4', name: 'Tailwind CSS', level: 85, category: 'frontend', icon: null, order: 4 },
  
  // Backend
  { id: '5', name: 'Node.js', level: 70, category: 'backend', icon: null, order: 1 },
  { id: '6', name: 'Python', level: 60, category: 'backend', icon: null, order: 2 },
  
  // Database
  { id: '7', name: 'PostgreSQL', level: 65, category: 'database', icon: null, order: 1 },
  { id: '8', name: 'MongoDB', level: 60, category: 'database', icon: null, order: 2 },
  
  // Tools
  { id: '9', name: 'Git', level: 80, category: 'tools', icon: null, order: 1 },
  { id: '10', name: 'Figma', level: 60, category: 'tools', icon: null, order: 2 },
]

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  // Initial state
  projects: demoProjects,
  filteredProjects: demoProjects,
  selectedCategory: 'all',
  sortOption: 'newest',
  searchQuery: '',
  skills: demoSkills,
  profile: demoProfile,
  isLoading: false,
  isAdmin: false,
  activeSection: 'home',
  
  // Project actions
  setProjects: (projects) => {
    set({ projects })
    get().filterAndSortProjects()
  },
  
  addProject: (project) => {
    set((state) => ({
      projects: [...state.projects, project]
    }))
    get().filterAndSortProjects()
  },
  
  updateProject: (id, updatedProject) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updatedProject } : p
      )
    }))
    get().filterAndSortProjects()
  },
  
  deleteProject: (id) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id)
    }))
    get().filterAndSortProjects()
  },
  
  // Skill actions
  setSkills: (skills) => set({ skills }),
  
  addSkill: (skill) => {
    set((state) => ({
      skills: [...state.skills, skill]
    }))
  },
  
  updateSkill: (id, updatedSkill) => {
    set((state) => ({
      skills: state.skills.map((s) =>
        s.id === id ? { ...s, ...updatedSkill } : s
      )
    }))
  },
  
  deleteSkill: (id) => {
    set((state) => ({
      skills: state.skills.filter((s) => s.id !== id)
    }))
  },
  
  // Profile actions
  setProfile: (profile) => set({ profile }),
  
  // Filter and sort actions
  setCategory: (category) => {
    set({ selectedCategory: category })
    get().filterAndSortProjects()
  },
  
  setSortOption: (option) => {
    set({ sortOption: option })
    get().filterAndSortProjects()
  },
  
  setSearchQuery: (query) => {
    set({ searchQuery: query })
    get().filterAndSortProjects()
  },
  
  filterAndSortProjects: () => {
    const { projects, selectedCategory, sortOption, searchQuery } = get()
    
    let filtered = [...projects]
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.technologies.some((t) => t.toLowerCase().includes(query))
      )
    }
    
    // Sort
    switch (sortOption) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
    }
    
    set({ filteredProjects: filtered })
  },
  
  // UI actions
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setActiveSection: (section) => set({ activeSection: section }),
  setIsLoading: (isLoading) => set({ isLoading }),
}))
