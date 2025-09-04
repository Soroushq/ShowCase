export interface Translation {
  [key: string]: string | Translation
}

export const translations: Record<string, Translation> = {
  en: {
    nav: {
      home: "Home",
      work: "Work", 
      about: "About",
      contact: "Contact"
    },
    hero: {
      greeting: "Hello, I'm",
      title: "Full-Stack Developer",
      subtitle: "Building Digital Experiences", 
      description: "I create modern web applications with cutting-edge technologies, focusing on performance, user experience, and clean code.",
      cta: "View My Work",
      ctaSecondary: "Get In Touch"
    },
    showcase: {
      title: "Featured Projects",
      subtitle: "Things I've built recently",
      viewProject: "View Project",
      viewCode: "View Code",
      technologies: "Technologies Used",
      allProjects: "View All Projects"
    },
    about: {
      title: "About Me",
      subtitle: "Get to know me better",
      description: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems and deliver exceptional user experiences.",
      background: "With over 5 years of experience in web development, I've had the privilege of working with startups and established companies to bring their digital visions to life. I specialize in React, Next.js, Node.js, and modern development practices.",
      skills: "Skills & Expertise",
      experience: "Years Experience",
      projects: "Projects Completed",
      clients: "Happy Clients"
    },
    contact: {
      title: "Let's Work Together", 
      subtitle: "Have a project in mind?",
      description: "I'm always interested in new opportunities and challenges. Let's discuss how we can bring your ideas to life.",
      cta: "Start a Conversation",
      social: "Connect with me",
      email: "Send Email",
      phone: "Call Me"
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
      contact: "تماس"
    },
    hero: {
      greeting: "سلام، من",
      title: "توسعه‌دهنده فول‌استک",
      subtitle: "ساخت تجربیات دیجیتال", 
      description: "اپلیکیشن‌های وب مدرن با تکنولوژی‌های پیشرفته می‌سازم، با تمرکز بر عملکرد، تجربه کاربری و کد تمیز.",
      cta: "مشاهده نمونه کارها",
      ctaSecondary: "تماس با من"
    },
    showcase: {
      title: "پروژه‌های منتخب",
      subtitle: "چیزهایی که اخیراً ساخته‌ام",
      viewProject: "مشاهده پروژه",
      viewCode: "مشاهده کد",
      technologies: "تکنولوژی‌های استفاده شده",
      allProjects: "مشاهده همه پروژه‌ها"
    },
    about: {
      title: "درباره من",
      subtitle: "بیشتر با من آشنا شوید",
      description: "من یک توسعه‌دهنده فول‌استک پرشور با تخصص در تکنولوژی‌های مدرن وب هستم. عاشق ساخت اپلیکیشن‌های زیبا و کاربردی هستم که مسائل دنیای واقعی را حل کنند.",
      background: "با بیش از ۵ سال تجربه در توسعه وب، افتخار همکاری با استارتاپ‌ها و شرکت‌های مستقر را داشته‌ام. در React، Next.js، Node.js و روش‌های مدرن توسعه تخصص دارم.",
      skills: "مهارت‌ها و تخصص‌ها",
      experience: "سال تجربه",
      projects: "پروژه تکمیل شده",
      clients: "مشتری راضی"
    },
    contact: {
      title: "بیایید با هم کار کنیم",
      subtitle: "پروژه‌ای در ذهن دارید؟",
      description: "همیشه به فرصت‌ها و چالش‌های جدید علاقه‌مند هستم. بیایید درباره تحقق ایده‌هایتان صحبت کنیم.",
      cta: "شروع گفتگو",
      social: "با من در ارتباط باشید",
      email: "ارسال ایمیل",
      phone: "تماس تلفنی"
    },
    footer: {
      rights: "تمام حقوق محفوظ است",
      built: "ساخته شده با Next.js و Tailwind CSS"
    }
  }
}
