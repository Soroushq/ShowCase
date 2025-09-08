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
  description: "Frontend Developer with 3+ years of hands-on experience building dynamic web applications. I specialize in Angular, TypeScript, and modern CSS frameworks, turning complex ideas into intuitive user interfaces. Currently leading frontend development at the Department of Education while pursuing my Master's in IT Management. I'm passionate about integrating AI-driven solutions and believe great code should be both powerful and maintainable.",
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
  description: "توسعه‌دهنده فرانت‌اند با بیش از ۳ سال تجربه عملی در طراحی و ساخت وب‌اپلیکیشن‌های پویا. از Angular و TypeScript تا HTML5 و Tailwind CSS، ابزارهای مدرن را به کار می‌گیرم تا رابط‌های کاربری روان و زیبا بسازم. تجربه رهبری تیم فرانت‌اند در بازطراحی سایت آموزش و پرورش و علاقه‌ای ویژه به یکپارچه‌سازی راه‌حل‌های هوشمند در پروژه‌هایم دارم.",
  cta: "مشاهده نمونه کارها",
  ctaSecondary: "بیایید صحبت کنیم",
},
about: {
  title: "درباره من",
  subtitle: "چرا من؟",
  description: "من کسی هستم که از حل مسائل پیچیده با کد لذت می‌برم و همیشه به دنبال یادگیری تکنولوژی‌های جدید هستم.",
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
