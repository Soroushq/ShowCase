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
    description: "Enterprise e-commerce with custom admin dashboard, Next.js APIs, Docker on VPS, Cloudflare DNS, and full SEO implementation.",
    image: "/pics/abrishampoosh.jpg",
    url: "https://abrishampoosh.com",
    technologies: ["Next.js", "TypeScript", "Node.js", "Docker", "Cloudflare", "VPS", "TailwindCSS", "SEO"],
    category: "web"
  },
  {
    id: 2,
    title: "Soroushop - Frontend E-Commerce Demo",
    description: "Client-side e-commerce interface with bilingual support, dark/light themes, Redux state management, and responsive design.",
    image: "/pics/shop.jpg",
    url: "https://soroushop.vercel.app",
    technologies: ["React", "TypeScript", "Vite", "Redux Toolkit", "TailwindCSS", "Material UI"],
    category: "web"
  },
  {
    id: 3,
    title: "Barname - Next.js Application",
    description: "Modern web app showcasing Next.js 14+ features with optimized performance and scalability.",
    image: "/pics/barname.jpg",
    url: "https://barname.vercel.app",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 4,
    title: "AramControl - Enterprise Management",
    description: "Electronics pricing and inventory system with order tracking and financial tools.",
    image: "/pics/pricing.jpg",
    url: "https://aramcontrol.com/PE-IV",
    technologies: ["React", "Node.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 5,
    title: "Educational Personnel Platform",
    description: "Angular-based personnel management system for province-wide education administration.",
    image: "/pics/sajfa.jpg",
    url: "#",
    technologies: ["Angular 17", "TypeScript", "TailwindCSS", "Material Design"],
    category: "web"
  },
]

export const portfolioDataFa: PortfolioItem[] = [
  {
    id: 1,
    title: "ابریشم‌پوش - پلتفرم فروشگاهی فول‌استک",
    description: "فروشگاه سازمانی با داشبورد ادمین، APIهای Next.js، Docker روی VPS، Cloudflare DNS و سئوی کامل.",
    image: "/pics/abrishampoosh.jpg",
    url: "https://abrishampoosh.com",
    technologies: ["Next.js", "TypeScript", "Node.js", "Docker", "Cloudflare", "VPS", "TailwindCSS", "SEO"],
    category: "web"
  },
  {
    id: 2,
    title: "سروشاپ - نمونه رابط کاربری فروشگاهی",
    description: "رابط فروشگاهی دوزبانه با پشتیبانی از حالت تاریک/روشن، مدیریت state با Redux و طراحی واکنش‌گرا.",
    image: "/pics/shop.jpg",
    url: "https://soroushop.vercel.app",
    technologies: ["React", "TypeScript", "Vite", "Redux Toolkit", "TailwindCSS", "Material UI"],
    category: "web"
  },
  {
    id: 3,
    title: "برنامه - اپلیکیشن Next.js",
    description: "وب‌اپ مدرن با قابلیت‌های Next.js 14+ بهینه‌سازی شده برای عملکرد و مقیاس‌پذیری.",
    image: "/pics/barname.jpg",
    url: "https://barname.vercel.app",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 4,
    title: "آرام‌کنترل - مدیریت سازمانی",
    description: "سیستم قیمت‌گذاری و موجودی الکترونیک با ردیابی سفارش و ابزارهای مالی.",
    image: "/pics/pricing.jpg",
    url: "https://aramcontrol.com/PE-IV",
    technologies: ["React", "Node.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 5,
    title: "سامانه مدیریت پرسنل آموزشی",
    description: "سیستم Angular برای مدیریت پرسنل آموزش‌وپرورش سراسر استان.",
    image: "/pics/sajfa.jpg",
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
