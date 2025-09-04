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
    title: "Soroushop - Modern E-Commerce Platform",
    description: "A modern bilingual e-commerce website built with React and Next.js, featuring dynamic language detection, dark/light themes, responsive design, interactive animations, product lazy loading, and advanced cart management.",
    image: "/pics/shop.png", // Replace with real screenshot in /public
    url: "https://soroushop.vercel.app",
    technologies: ["React", "TypeScript", "Next.js", "Vite", "TailwindCSS", "Material UI", "Redux Toolkit", "Redux Persist", "React Router", "Axios", "Firebase"],
    category: "web"
  },
  {
    id: 2,
    title: "Barname - Modern Next.js Application",
    description: "A highly modern web application built with the latest Next.js features, focusing on performance, scalability, and seamless user experience.",
    image: "/pics/barname.png", // Replace with real screenshot in /public
    url: "https://barname.vercel.app",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 3,
    title: "Aramcontrol - Private Electronics Control & Warehouse System",
    description: "A private electronics pricing and warehouse management system with order management, component tracking, and financial assistance features designed for corporate needs.",
    image: "/pics/pricing.png", // Replace with real screenshot or placeholder
    url: "https://aramcontrol.com/PE-IV",
    technologies: ["React", "Node.js", "TypeScript", "TailwindCSS"],
    category: "web"
  },
  {
    id: 4,
    title: "Provincial Educational Personnel Management System (Angular)",
    description: "An Angular 17 application designed for managing educational personnel across the province, implementing complex managerial functions with modern UI using Material Design and TailwindCSS.",
    image: "/pics/sajfa.png", // Add real screenshot when available
    url: "#", // No live URL available due to server issues
    technologies: ["Angular 17", "TypeScript", "TailwindCSS", "Material Design"],
    category: "web"
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
