// File: src/app/data/translations.ts
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
      greeting: "Hi, I'm",
      name: "Soroush",
      title: "Full-Stack Developer",
      subtitle: "Building fast, elegant experiences from idea to deployment",
      description: `I craft modern web apps that are blazing fast, accessible, and a joy to use.

• Front-end: React, Next.js, Angular & TypeScript
• Back-end: Node.js, API design, Docker & VPS deployments
• DevOps: CI/CD, Cloudflare DNS, SSL automation
• Design: TailwindCSS, SEO, admin dashboards from scratch`,
      cta: "See My Work",
      ctaSecondary: "Let's Talk",
    },
    about: {
      title: "About Me",
      subtitle: "Behind the code",
      description: "I love solving tricky problems with clean code and building interfaces that feel effortless.",
      background: "My journey started in electrical engineering, took a detour through teaching, then landed in web development—where I found my true calling. Today, I lead dev teams at the Department of Education while shipping production apps end-to-end. I believe great tech should serve people, not complicate their lives.",
      skills: "Tech Stack & Tools",
      experience: "Years Coding",
      projects: "Projects Shipped",
      clients: "Happy Collaborations",
    },
    contact: {
      title: "Let's Build Something Great",
      subtitle: "Got a project in mind?",
      description: "Whether it's a fresh idea or upgrading something existing, I'd love to hear about it and see how we can bring it to life.",
      cta: "Start a Conversation",
      social: "Connect with me",
      email: "Send an email",
      phone: "Give me a call",
    },
    showcase: {
      viewProject: "View Live",
      viewCode: "Code",
    },
    projects: "Featured Work",
    footer: {
      rights: "All rights reserved",
      built: "Built with Next.js & Tailwind CSS"
    }
  },

  fa: {
    nav: {
      home: "خانه",
      work: "نمونه‌کارها",
      about: "درباره من",
      contact: "تماس",
    },
    hero: {
      greeting: "سلام، من",
      name: "سروش ام",
      title: "وب دولوپر",
      subtitle: "از ایده تا دیپلوی، سریع و حرفه‌ای",
      description: `اپلیکیشن‌های وب مدرن می‌سازم که سریع، قابل دسترس و لذت‌بخش باشن.

• فرانت‌اند: React، Next.js، Angular و TypeScript
• بک‌اند: Node.js، طراحی API، Docker و دیپلوی روی VPS
• دواپس: CI/CD، Cloudflare DNS، اتوماسیون SSL
• طراحی: TailwindCSS، سئو و داشبورد ادمین از صفر`,
      cta: "نمونه‌کارها",
      ctaSecondary: "بیا حرف بزنیم",
    },
    about: {
      title: "درباره من",
      subtitle: "پشت کدها چیه؟",
      description: "حل مسائل پیچیده با کد تمیز و ساختن رابط‌هایی که استفاده‌شون راحت و لذت‌بخشه، کارِ منه.",
      background: "مسیرم از مهندسی برق شروع شد، یه مدت تدریس کردم، بعد عاشق توسعه وب شدم—جایی که واقعا حس می‌کنم خودمم. الان تو آموزش‌وپرورش تیم‌های توسعه رو رهبری می‌کنم و در عین حال پروژه‌های کامل رو از صفر تا دیپلوی می‌برم جلو. باور دارم تکنولوژی خوب باید زندگی رو راحت‌تر کنه، نه پیچیده‌تر.",
      skills: "مهارت‌ها و ابزارها",
      experience: "سال کدنویسی",
      projects: "پروژه تحویل‌شده",
      clients: "همکاری موفق",
    },
    contact: {
      title: "بیا یه چیز باحال بسازیم",
      subtitle: "پروژه داری؟",
      description: "ایده تازه یا ارتقای چیزی که الان هست—هرچی باشه، بیا ببینیم چطور می‌تونیم باهم بهترش کنیم.",
      cta: "شروع گفتگو",
      social: "بیا باهم حرف بزنیم",
      email: "ایمیل بزن",
      phone: "زنگ بزن",
    },
    showcase: {
      viewProject: "مشاهده سایت",
      viewCode: "کد",
    },
    projects: "نمونه‌کارهای برجسته",
    footer: {
      rights: "تمام حقوق محفوظ است",
      built: "ساخته شده با Next.js و Tailwind CSS",
    }
  }
}
