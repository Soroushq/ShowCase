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
    title: "E-Commerce Platform",
    description: "Modern online shopping experience with React & Node.js",
    image: "/placeholder-project1.jpg",
    url: "https://example-ecommerce.com",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    category: 'web'
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative project management tool",
    image: "/placeholder-project2.jpg", 
    url: "https://example-tasks.com",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    category: 'web'
  },
  {
    id: 3,
    title: "Real Estate Website",
    description: "Property listing and management system",
    image: "/placeholder-project3.jpg",
    url: "https://example-realestate.com", 
    technologies: ["Vue.js", "Laravel", "MySQL", "Tailwind CSS"],
    category: 'web'
  },
  {
    id: 4,
    title: "Mobile Banking App",
    description: "Secure financial transactions on mobile",
    image: "/placeholder-project4.jpg",
    url: "https://example-banking.com",
    technologies: ["React Native", "Express.js", "MongoDB", "JWT"],
    category: 'mobile'
  }
]

export const skills: Skill[] = [
  { name: "React/Next.js", level: 95, category: 'frontend' },
  { name: "TypeScript", level: 90, category: 'frontend' },
  { name: "Tailwind CSS", level: 92, category: 'frontend' },
  { name: "Node.js", level: 85, category: 'backend' },
  { name: "PHP/Laravel", level: 80, category: 'backend' },
  { name: "Database Design", level: 88, category: 'backend' },
  { name: "Git/GitHub", level: 90, category: 'tools' },
  { name: "Docker", level: 75, category: 'tools' },
  { name: "UI/UX Design", level: 78, category: 'tools' }
]

export const socialLinks: SocialLink[] = [
  { 
    name: "GitHub", 
    url: "https://github.com/yourusername", 
    icon: "Github",
    color: "#333"
  },
  { 
    name: "LinkedIn", 
    url: "https://linkedin.com/in/yourusername", 
    icon: "Linkedin",
    color: "#0077B5"
  },
  { 
    name: "Twitter", 
    url: "https://twitter.com/yourusername", 
    icon: "Twitter",
    color: "#1DA1F2"
  },
  { 
    name: "Email", 
    url: "mailto:your.email@example.com", 
    icon: "Mail",
    color: "#EA4335"
  }
]

export const personalInfo = {
  name: "Your Name",
  title: "Full-Stack Developer",
  location: "Your City, Country",
  experience: "5+ years",
  projectsCompleted: 50,
  clientsSatisfied: 30
}
