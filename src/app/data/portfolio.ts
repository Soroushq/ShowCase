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

export const portfolioData = [
  {
    id: 1,
    title: "Soroushop - Complete E-Commerce Experience",
    description: "A bilingual e-commerce platform showcasing modern React architecture with intelligent language detection, seamless dark/light mode transitions, and advanced state management. Features include optimized product catalogs, smart cart functionality, and responsive design patterns.",
    image: "/pics/shop.png",
    url: "https://soroushop.vercel.app",
    technologies: ["React", "TypeScript", "Next.js", "Vite", "TailwindCSS", "Material UI", "Redux Toolkit", "Redux Persist", "React Router", "Axios", "Firebase"],
    category: "web"
  },
  {
    id: 2,
    title: "Barname - Next.js Showcase Application",
    description: "A cutting-edge web application demonstrating the latest Next.js capabilities, optimized for performance and scalability. Built with modern development practices and focused on delivering exceptional user experiences across all devices.",
    image: "/pics/barname.png",
    url: "https://barname.vercel.app",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 3,
    title: "AramControl - Enterprise Management System",
    description: "A comprehensive electronics pricing and inventory management solution designed for corporate environments. Features advanced order tracking, component management, and integrated financial tools for streamlined business operations.",
    image: "/pics/pricing.png",
    url: "https://aramcontrol.com/PE-IV",
    technologies: ["React", "Node.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 4,
    title: "Educational Personnel Management Platform",
    description: "An Angular-based application serving the Department of Education for province-wide personnel management. Implements complex administrative workflows with modern Material Design principles and responsive architecture.",
    image: "/pics/sajfa.png",
    url: "#", // Internal system - no public access
    technologies: ["Angular 17", "TypeScript", "TailwindCSS", "Material Design"],
    category: "web"
  },
];

export const portfolioDataFa = [
  {
    id: 1,
    title: "سروشاپ - پلتفرم جامع فروشگاه آنلاین",
    description: "فروشگاه آنلاین دوزبانه با معماری مدرن React، تشخیص هوشمند زبان، تغییر روان حالت تاریک/روشن و مدیریت پیشرفته state. شامل کاتالوگ بهینه محصولات، عملکرد هوشمند سبد خرید و طراحی واکنش‌گرا.",
    image: "/pics/shop.png",
    url: "https://soroushop.vercel.app",
    technologies: ["React", "TypeScript", "Next.js", "Vite", "TailwindCSS", "Material UI", "Redux Toolkit", "Redux Persist", "React Router", "Axios", "Firebase"],
    category: "وب"
  },
  {
    id: 2,
    title: "برنامه - اپلیکیشن نمایشی Next.js",
    description: "اپلیکیشن وب پیشرفته که آخرین قابلیت‌های Next.js را نمایش می‌دهد، بهینه‌سازی شده برای عملکرد و مقیاس‌پذیری. ساخته شده با بهترین روش‌های توسعه مدرن و تمرکز بر ارائه تجربه استثنایی کاربری.",
    image: "/pics/barname.png",
    url: "https://barname.vercel.app",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    category: "وب"
  },
  {
    id: 3,
    title: "آرام‌کنترل - سیستم مدیریت سازمانی",
    description: "راه‌حل جامع قیمت‌گذاری الکترونیک و مدیریت موجودی طراحی شده برای محیط‌های شرکتی. شامل ردیابی پیشرفته سفارشات، مدیریت اجزاء و ابزارهای مالی یکپارچه برای عملیات کسب‌وکار ساده.",
    image: "/pics/pricing.png",
    url: "https://aramcontrol.com/PE-IV",
    technologies: ["React", "Node.js", "TypeScript", "TailwindCSS"],
    category: "وب"
  },
  {
    id: 4,
    title: "سامانه مدیریت پرسنل آموزشی",
    description: "اپلیکیشن مبتنی بر Angular در خدمت آموزش و پرورش برای مدیریت پرسنل سراسر استان. پیاده‌سازی جریان‌های کاری پیچیده اداری با اصول مدرن Material Design و معماری واکنش‌گرا.",
    image: "/pics/sajfa.png",
    url: "#", // سیستم داخلی - بدون دسترسی عمومی
    technologies: ["Angular 17", "TypeScript", "TailwindCSS", "Material Design"],
    category: "وب"
  },
];


export const personalInfo = {
  name: "Soroush Qary Ivary",
  title: "Frontend Developer",
  location: "Mashhad, Iran",
  experience: "2+ years",
  projectsCompleted: 5,
  clientsSatisfied: "countless (:",
  email: "soroush.qary.eemit@gmail.com",
  linkedin: "https://www.linkedin.com/in/soroush-qary-08392334b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  github: "https://github.com/Soroushq",
  phone: "09154758378",
  resumeFileName: "Soroush_Qary_Ivary_Resume.pdf"
}

export const skills = [
  { name: "Next.js, Angular, JavaScript, TypeScript", level: 95, category: 'frontend' },
  { name: "React, Redux, Context / REST API", level: 90, category: 'frontend' },
  { name: "Vite, Webpack, Docker", level: 80, category: 'tools' },
  { name: "TailwindCSS, CSS3, Responsive Design", level: 90, category: 'frontend' },
  { name: "Git, Agile, Scrum", level: 85, category: 'tools' },
  { name: "Debugging, Unit Testing, CI/CD", level: 75, category: 'tools' },
  { name: "PHP, WordPress, Python", level: 85, category: 'backend' },
  { name: "AI Integration, SEO Optimization", level: 80, category: 'backend' }
]

export const socialLinks = [
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
