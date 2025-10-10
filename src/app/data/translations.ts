export interface Translation {
  [key: string]: string | Translation
}

export const translations = {
  en: {
    nav: {
      home: "Home",
      work: "Work",
      about: "About",
      contact: "Contact",
    },
    hero: {
  greeting: "Hello, I'm",
  name: "Soroush Qary Ivary",
  title: "Frontend Developer",
  subtitle: "Crafting meaningful digital experiences",
  description: `
Creative frontend developer passionate about clean, modern interfaces.  
• Skilled in React, Next.js, Angular, and TypeScript  
• Focused on UX, speed, and maintainable architecture  
• Experienced with TailwindCSS and responsive design  
• Exploring AI tools for smarter, scalable web solutions
`,
  cta: "Explore My Work",
  ctaSecondary: "Let's Connect",
},
about: {
  title: "About Me",
  subtitle: "The story behind the code",
  description: "I'm someone who finds genuine joy in solving complex problems through clean, efficient code and creating interfaces that users actually love to interact with.",
  background: "My journey began with Electrical Engineering, evolved through teaching, and found its home in frontend development. This unique path has given me a rare perspective—I understand both the technical challenges developers face and the human factors that make products successful. At the Department of Education, I wear two hats: HR Planning Analyst by day and Frontend Team Lead by passion, which has taught me that great technology serves people, not the other way around.",
  skills: "Tech Stack & Tools",
  experience: "Years Building",
  projects: "Solutions Delivered",
  clients: "Teams Collaborated",
},
contact: {
  title: "Let's Build Something Amazing",
  subtitle: "Ready to start your next project?",
  description: "Whether you're looking to revamp an existing application or build something entirely new, I'd love to hear about your vision and explore how we can make it a reality together.",
  cta: "Start the Conversation",
  social: "Let's connect",
  email: "Drop me a line",
  phone: "Give me a call",
},

    footer: {
      rights: "All rights reserved",
      built: "Built with Next.js & Tailwind CSS"
    }
  },

  fa: {
    nav: {
      home: "خانه",
      work: "نمونه کارها",
      about: "درباره من",
      contact: "تماس",
    },
hero: {
  greeting: "سلام، من",
  name: "سروش قاری ایوری",
  title: "توسعه‌دهنده فرانت‌اند هستم",
  subtitle: "خالق تجربیات کاربری بهتر",
  description: `
توسعه‌دهنده خلاق فرانت‌اند با تمرکز بر طراحی مدرن و کدنویسی تمیز.  
• مسلط به React، Next.js، Angular و TypeScript  
• تمرکز بر تجربه کاربری، سرعت و معماری مقیاس‌پذیر  
• متخصص در TailwindCSS و طراحی واکنش‌گرا  
• علاقه‌مند به استفاده از ابزارهای هوش مصنوعی در توسعه وب
`,

  cta: "مشاهده نمونه کارها",
  ctaSecondary: "ارتباط با من",
},
about: {
  title: "درباره من",
  subtitle: "چرا من؟",
  description: "من وب‌سایت‌هایی می‌سازم که هم زیبا هستند و هم سریع. هدفم ایجاد تجربه‌ای روان و جذاب برای کاربر با طراحی مینیمال و عملکرد بالا است.",
  background: "مسیرم از مهندسی برق شروع شد و به مدیریت IT ادامه یافت، اما عشق واقعی‌ام توسعه فرانت‌اند است. در کنار کار روزانه‌ام به عنوان کارشناس منابع انسانی، تیم‌های توسعه را رهبری می‌کنم و پروژه‌های وب را از صفر تا صد پیاده‌سازی می‌کنم. این ترکیب منحصر به فرد باعث شده درک عمیق‌تری از نیازهای کاربران و سازمان‌ها داشته باشم.",
  skills: "مهارت‌ها و ابزارها",
  experience: "سال تجربه کاری",
  projects: "پروژه موفق",
  clients: "تیم و سازمان همکار",
},

    contact: {
      title: "میتونیم همکاری کنیم",
      subtitle: "پروژه‌ای داری؟",
      description:"من که پایه ام، ی کلیک با مشورت باهم فاصله داریم!",
      cta: "شروع گفتگو",
      social: "با من در ارتباط باشید",
      email: "ارسال ایمیل",
      phone: "تماس تلفنی",
    },
    footer: {
      rights: "تمام حقوق محفوظ است",
      built: "ساخته شده با Next.js و Tailwind CSS",
    }
  }
}
