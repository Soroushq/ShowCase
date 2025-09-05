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
      name:"soroush Qary Ivary",
      title: "Frontend Developer",
      subtitle: "Building Digital Experiences",
      description: "Frontend Developer with expertise in scalable and dynamic web applications. Proficient in React, Next, Angular, using TypeScript with advanced skills in state management, responsive design, and TailwindCSS. Experienced in leading frontend development, integrating AI-driven solutions, and migrating legacy systems to modern frameworks. Strong understanding of Agile methodologies and API integration. Academic background includes a Master's in IT Management and a Bachelor's in Electrical Engineering.",
      cta: "View My Work",
      ctaSecondary: "Get In Touch",
    },
    about: {
      title: "About Me",
      subtitle: "Get to know me better",
      description: "I'm a passionate frontend developer with expertise in modern web technologies, creating scalable and responsive applications.",
      background: "Experience leading teams and migrating legacy systems to modern frameworks with strong expertise in React, Next.js, and Node.js.",
      skills: "Skills & Expertise",
      experience: "Years Experience",
      projects: "Projects Completed",
      clients: "Happy Clients",
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Have a project in mind?",
      description: "I'm always interested in new opportunities and challenges. Let's discuss how we can bring your ideas to life.",
      cta: "Start a Conversation",
      social: "Connect with me",
      email: "Send Email",
      phone: "Call Me",
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
      name:"سروش قاری ایوری",
      title: "توسعه‌دهنده فرانت‌اند هستم",
      subtitle: "سازنده تجربیات دیجیتال",
      description: "توسعه‌دهنده فرانت‌اند با تخصص در طراحی و پیاده‌سازی وب اپلیکیشن‌های پویا و مقیاس‌پذیر. مسلط به React، Next, Angular و TypeScript آشنایی کامل به State Management، طراحی واکنش‌گرا و TailwindCSS. با تجربه در هدایت تیم‌های توسعه فرانت‌اند، ادغام راه‌حل‌های مبتنی بر هوش مصنوعی و مهاجرت سیستم‌های Legacy به فریم‌ورک‌های مدرن. آشنا به متدولوژی‌های Agile و یکپارچه‌سازی API. با تحصیلات کارشناسی ارشد مدیریت IT و کارشناسی مهندسی برق.",
      cta: "مشاهده نمونه کارهام",
      ctaSecondary: "تماس با من",
    },
    about: {
      title: "درباره من",
      subtitle: "بیشتر با من آشنا شوید",
      description: "من یک توسعه‌دهنده فرانت‌اند پرشور با تخصص در تکنولوژی‌های مدرن وب هستم که اپلیکیشن‌های مقیاس‌پذیر و واکنش‌گرا می‌سازم.",
      background: "تجربه مدیریت تیم‌های توسعه و مهاجرت سیستم‌های قدیمی به فریم‌ورک‌های مدرن با تخصص در React، Next.js و Node.js.",
      skills: "مهارت‌ها و تخصص‌ها",
      experience: "سال تجربه",
      projects: "پروژه تکمیل شده",
      clients: "مشتری راضی",
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
