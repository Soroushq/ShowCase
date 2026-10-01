// File: src/app/data/translations.ts
export interface Translation {
  [key: string]: string | Translation
}

export const translations = {
  en: {
    nav: {
      home: "Home",
      work: "Work",
      invention: "Patent & Ventures",
      about: "About",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Soroush",
      title: "Full-Stack Architect & Patented Inventor",
      subtitle: "Architecting high-impact web platforms, privacy-first tools & patented economic models",
      description: `I architect modern digital platforms that are blazing fast, privacy-first, and deeply human.

• Innovation: Officially Patented E-Commerce Engine (#114350)
• Front-end & PWA: React, Next.js 15, Angular & TypeScript
• Back-end & Infra: Node.js, Docker, VPS, Cloudflare & Offline-First Systems`,
      cta: "See My Work",
      ctaSecondary: "Let's Talk",
    },
    about: {
      title: "About Me",
      subtitle: "Mindset, Craft & Values",
      description: "I see software as an instrument to solve genuine human friction — whether that means giving people private offline tools to master their daily lives, building free utilities for digital creators, or engineering patented models that reduce real-world industrial overhead.",
      background: "My foundation started in electrical engineering and was deepened through years of teaching and mentoring. That combination of hardware-level rigor and human empathy guides how I architect systems today. Alongside leading dev teams for province-wide education platforms, I design end-to-end production web applications and research innovative commercial models — including my officially registered e-commerce invention (#114350). I believe the best technology is quiet, respectful of user privacy, and genuinely useful from the very first click.",
      skills: "Tech Stack & Tools",
      experience: "Years Coding",
      projects: "Projects Shipped",
      patent: "Official Patent",
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
      invention: "اختراع و سرمایه‌گذاری",
      about: "درباره من",
      contact: "تماس",
    },
    hero: {
      greeting: "سلام، من",
      name: "سروش ام",
      title: "معمار فول‌استک و مخترع رسمی",
      subtitle: "خلق ابزارهای انسان‌محور، وب‌اپلیکیشن‌های نسل بعد و سازوکارهای تجاری ثبت‌شده",
      description: `طراحی و معماری پلتفرم‌های دیجیتال مدرن، فوق‌سریع و متعهد به حریم خصوصی.

• نوآوری و ثبت اختراع: سازوکار ثبت‌شده تجارت الکترونیک (شماره ثبت ۱۱۴۳۵۰)
• فرانت‌اند و وب‌اپلیکیشن: React، Next.js 15، Angular و TypeScript
• بک‌اند و زیرساخت: Node.js، داکر، سرورهای VPS و سیستم‌های آفلاین‌محور`,
      cta: "نمونه‌کارها",
      ctaSecondary: "بیا حرف بزنیم",
    },
    about: {
      title: "درباره من",
      subtitle: "مسیر حرفه‌ای، ارزش‌ها و دیدگاه",
      description: "برای من برنامه‌نویسی صرفاً نوشتن کد نیست، بلکه تلاشی است برای حل چالش‌های واقعی انسان‌ها — از خلق ابزارهای آفلاین و امن برای ساماندهی روزمره و مدیریت مالی، تا ساخت ابزارهای کاربردی رایگان برای تولیدکنندگان محتوا و طراحی سیستم‌های پیشرفته سازمانی.",
      background: "ریشه‌های حرفه‌ای من با دقت ریاضی و منطق مداری مهندسی برق شکل گرفت و با تجربه ارزشمند تدریس و انتقال دانش درآمیخت. این ترکیب به من آموخت که چگونه میان دقت مهندسی و نیازهای انسانی پل بزنم. امروزه در کنار هدایت تیم‌های فنی توسعه سامانه‌های کلان آموزش‌وپرورش، به خلق پلتفرم‌های مقیاس‌پذیر و ثبت نوآوری‌های تجاری می‌پردازم — دستاوردی که در قالب اختراع رسمی ثبت‌شده در تجارت الکترونیک (شماره ۱۱۴۳۵۰) به بار نشست. باور قلبی من این است که تکنولوژی واقعی، سیستمی است که حریم خصوصی کاربران را حفظ می‌کند، از پیچیدگی‌های زاید می‌کاهد و در عمل زندگی را روان‌تر می‌سازد.",
      skills: "مهارت‌ها و ابزارها",
      experience: "سال تجربه کدنویسی",
      projects: "پروژه تحویل‌شده",
      patent: "اختراع رسمی ثبت‌شده",
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
