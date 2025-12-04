// File: src/app/data/portfolio.ts
export interface PortfolioItem {
  id: number
  title: string
  description: string
  image: string
  url: string
  technologies: string[]
  category: 'web' | 'mobile' | 'design'
}

export interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'tools'
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  color: string
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Abrishampoosh - Full-Stack E-Commerce Platform",
    description: "Complete enterprise e-commerce solution with custom admin dashboard, Next.js API routes, Docker deployment on VPS, Cloudflare DNS integration, and comprehensive SEO optimization for all pages and products.",
    image: "/pics/abrishampoosh.png",
    url: "https://abrishampoosh.com",
    technologies: ["Next.js", "TypeScript", "Node.js", "Docker", "Cloudflare", "VPS", "TailwindCSS", "SEO", "Admin Dashboard"],
    category: "web"
  },
  {
    id: 2,
    title: "Soroushop - Complete E-Commerce Experience",
    description: "A bilingual e-commerce platform showcasing modern React architecture with intelligent language detection, seamless dark/light mode transitions, and advanced state management.",
    image: "/pics/shop.png",
    url: "https://soroushop.vercel.app",
    technologies: ["React", "TypeScript", "Next.js", "Vite", "TailwindCSS", "Material UI", "Redux Toolkit", "Firebase"],
    category: "web"
  },
  {
    id: 3,
    title: "Barname - Next.js Showcase Application",
    description: "A cutting-edge web application demonstrating the latest Next.js capabilities, optimized for performance and scalability.",
    image: "/pics/barname.png",
    url: "https://barname.vercel.app",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 4,
    title: "AramControl - Enterprise Management System",
    description: "A comprehensive electronics pricing and inventory management solution designed for corporate environments.",
    image: "/pics/pricing.png",
    url: "https://aramcontrol.com/PE-IV",
    technologies: ["React", "Node.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 5,
    title: "Educational Personnel Management Platform",
    description: "An Angular-based application serving the Department of Education for province-wide personnel management.",
    image: "/pics/sajfa.png",
    url: "#",
    technologies: ["Angular 17", "TypeScript", "TailwindCSS", "Material Design"],
    category: "web"
  },
]

export const portfolioDataFa: PortfolioItem[] = [
  {
    id: 1,
    title: "ابریشم‌پوش - پلتفرم فروشگاهی فول‌استک",
    description: "راه‌حل کامل فروشگاه آنلاین سازمانی با داشبورد ادمین سفارشی، API های Next.js، دیپلوی Docker روی VPS، یکپارچه‌سازی Cloudflare DNS و بهینه‌سازی سئوی جامع.",
    image: "/pics/abrishampoosh.png",
    url: "https://abrishampoosh.com",
    technologies: ["Next.js", "TypeScript", "Node.js", "Docker", "Cloudflare", "VPS", "TailwindCSS", "SEO", "Admin Dashboard"],
    category: "web"
  },
  {
    id: 2,
    title: "سروشاپ - پلتفرم جامع فروشگاه آنلاین",
    description: "فروشگاه آنلاین دوزبانه با معماری مدرن React، تشخیص هوشمند زبان، تغییر روان حالت تاریک/روشن و مدیریت پیشرفته state.",
    image: "/pics/shop.png",
    url: "https://soroushop.vercel.app",
    technologies: ["React", "TypeScript", "Next.js", "Vite", "TailwindCSS", "Material UI", "Redux Toolkit", "Firebase"],
    category: "web"
  },
  {
    id: 3,
    title: "برنامه - اپلیکیشن نمایشی Next.js",
    description: "اپلیکیشن وب پیشرفته که آخرین قابلیت‌های Next.js را نمایش می‌دهد، بهینه‌سازی شده برای عملکرد و مقیاس‌پذیری.",
    image: "/pics/barname.png",
    url: "https://barname.vercel.app",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 4,
    title: "آرام‌کنترل - سیستم مدیریت سازمانی",
    description: "راه‌حل جامع قیمت‌گذاری الکترونیک و مدیریت موجودی طراحی شده برای محیط‌های شرکتی.",
    image: "/pics/pricing.png",
    url: "https://aramcontrol.com/PE-IV",
    technologies: ["React", "Node.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 5,
    title: "سامانه مدیریت پرسنل آموزشی",
    description: "اپلیکیشن مبتنی بر Angular در خدمت آموزش و پرورش برای مدیریت پرسنل سراسر استان.",
    image: "/pics/sajfa.png",
    url: "#",
    technologies: ["Angular 17", "TypeScript", "TailwindCSS", "Material Design"],
    category: "web"
  },
]

export const personalInfo = {
  name: "Soroush Qary Ivary",
  title: "Full-Stack Developer",
  location: "Mashhad, Iran",
  experience: "2+ years",
  projectsCompleted: 6,
  clientsSatisfied: "countless (:",
  email: "soroush.qary.eemit@gmail.com",
  linkedin: "https://www.linkedin.com/in/soroush-qary-08392334b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  github: "https://github.com/Soroushq",
  phone: "09154758378",
  resumeFileName: "Soroush_Qary_Ivary_Resume.pdf"
}

export const skills: Skill[] = [
  { name: "React, Next.js, Angular, TypeScript", level: 95, category: 'frontend' },
  { name: "Node.js, API Design, Docker & VPS", level: 85, category: 'backend' },
  { name: "Redux, Context API, REST & GraphQL", level: 90, category: 'frontend' },
  { name: "TailwindCSS, Responsive Design", level: 92, category: 'frontend' },
  { name: "Git, CI/CD, Cloudflare, DNS", level: 88, category: 'tools' },
  { name: "SEO, Admin Dashboards, Testing", level: 85, category: 'tools' },
  { name: "PHP, WordPress, Python", level: 80, category: 'backend' },
]

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Soroushq",
    icon: "Github",
    color: "#333"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/soroush-qary-08392334b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: "Linkedin",
    color: "#0077B5"
  },
  {
    name: "Email",
    url: "mailto:soroush.qary.eemit@gmail.com",
    icon: "Mail",
    color: "#EA4335"
  },
  {
    name: "Phone: 09154758378",
    url: "tel:09154758378",
    icon: "Phone",
    color: "#22c55e"
  }
]
