// File: src/app/data/portfolio.ts
export interface PortfolioItem {
  id: number
  title: string
  description: string
  image: string
  url: string
  technologies: string[]
  category: 'web' | 'mobile' | 'design'
  featured?: boolean
  badge?: string
  outOfService?: boolean
  notice?: string
  isStealth?: boolean
  isSeekingFund?: boolean
  partnershipEmail?: string
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
    id: 8,
    title: "SQPlanner - 24/7 Habit, Task & Financial Life OS",
    description: "An all-in-one personal operating system combining intelligent 24/7 habit tracking, streak milestones, task planning, and comprehensive personal financial budgeting. Engineered as a fully offline-first, privacy-focused PWA that stores all data locally. Delivers seamless adaptability across 5 custom device resolutions and responsive breakpoints, backed by frequent updates and modern features.",
    image: "/pics/sqplanner.jpg",
    url: "https://sqplanner.vercel.app",
    technologies: ["PWA", "Offline-First", "React", "TypeScript", "TailwindCSS", "Financial Engine", "5 Responsive Breakpoints"],
    category: "web",
    featured: true,
    badge: "🔥 NEW & FEATURED PWA"
  },
  {
    id: 9,
    title: "SoroushTP - Professional Customizable Teleprompter",
    description: "A free, full-featured web teleprompter crafted for video creators, presenters, speakers, and podcasters. Highly customizable with precision scroll speed control, instant font sizing, custom text/background color palettes, mirror & flip modes for physical glass rigs, and clean responsive UI/UX controls.",
    image: "/pics/soroushtp.jpg",
    url: "https://soroushtp.vercel.app",
    technologies: ["React", "TypeScript", "TailwindCSS", "Fullscreen API", "Mirror Mode", "Web APIs", "UI/UX Controls"],
    category: "web",
    featured: true,
    badge: "⚡ NEW FREE TOOL"
  },
  {
    id: 1,
    title: "Abrishampoosh - Full-Stack E-Commerce Platform",
    description: "Enterprise e-commerce with custom admin dashboard, Next.js APIs, Docker on VPS, Cloudflare DNS, and full SEO implementation.",
    image: "/pics/abrishampoosh.jpg",
    url: "https://abrishampoosh.com",
    technologies: ["Next.js", "TypeScript", "Node.js", "Docker", "Cloudflare", "VPS", "TailwindCSS", "SEO"],
    category: "web",
    outOfService: true,
    notice: "Out of service, but the codes and files are available on request to present"
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
  {
    id: 6,
    title: "Vibe Menus - Digital Hospitality & Smart Dining OS",
    description: "Interactive contactless digital menu and smart restaurant operating system. Features QR code multi-table routing, customizable branding themes, instantaneous menu updating, and patron analytics. Currently in trial venue pilot testing and open for cafe/restaurant network partnerships and seed growth capital.",
    image: "/pics/vibemenus.jpg",
    url: "https://vibemenus.vercel.app",
    technologies: ["Next.js 15", "React", "TypeScript", "TailwindCSS", "QR Systems", "Hospitality Tech"],
    category: "web",
    isSeekingFund: true,
    badge: "🌱 PILOT & GROWTH PARTNERS",
    notice: "Commercial Pilot Stage: Deployed in trial venues. Welcoming restaurant syndicates, pilot venue expansions, and seed-stage growth investors.",
    partnershipEmail: "soroush.qary.eemit@gmail.com"
  },
  {
    id: 7,
    title: "Project Mashhadoc (Stealth R&D)",
    description: "Proprietary digital service infrastructure in confidential stealth development. Engineered with high scalability and security standards. Specific mechanisms and workflows remain protected prior to public rollout. Inquiries regarding strategic partnerships, institutional collaborations, and early-stage capital are welcome via direct contact under mutual NDA.",
    image: "/pics/mashhadoc.jpg",
    url: "mailto:soroush.qary.eemit@gmail.com?subject=Strategic%20Partnership%20%26%20Investment%20Inquiry%20-%20Project%20Mashhadoc",
    technologies: ["Proprietary Stack", "Confidential Architecture", "Enterprise Security", "Stealth R&D"],
    category: "web",
    isStealth: true,
    badge: "🔒 STEALTH • STRATEGIC HEALTHTECH",
    notice: "Confidential R&D: Closed-development healthcare coordination infrastructure. Strategic investment deck and private demo under mutual NDA.",
    partnershipEmail: "soroush.qary.eemit@gmail.com"
  },
]

export const portfolioDataFa: PortfolioItem[] = [
  {
    id: 8,
    title: "پلنر هوشمند ۲۴/۷ - مدیریت عادات، برنامه‌ریزی و حسابداری",
    description: "یک سیستم‌عامل جامع و هوشمند برای مدیریت زندگی شخصی؛ شامل ردیابی ۲۴ ساعته عادات، زنجیره استریک (Streak)، مدیریت تسک‌ها و بودجه‌بندی مالی دقیق. توسعه‌یافته به صورت کاملاً آفلاین و امن (PWA) با ذخیره‌سازی محلی بدون وابستگی به سرور، بهینه‌سازی شده برای ۵ رزولوشن مختلف دستگاه‌ها و همراه با آپدیت‌های مداوم.",
    image: "/pics/sqplanner.jpg",
    url: "https://sqplanner.vercel.app",
    technologies: ["PWA", "آفلاین‌محور", "React", "TypeScript", "TailwindCSS", "موتور محاسبات مالی", "طراحی چندرزولوشن"],
    category: "web",
    featured: true,
    badge: "🔥 پروژه جدید و ویژه PWA"
  },
  {
    id: 9,
    title: "سروش تی‌پی - تله‌پرامپتر حرفه‌ای و رایگان تحت وب",
    description: "ابزار آنلاین و فوق‌العاده کاربردی تله‌پرامپتر برای تولیدکنندگان محتوا، ارائه‌دهندگان، سخنرانان و ضبط ویدیو. مجهز به کنترل نرم و میلی‌متری سرعت اسکرول، تغییر آنی سایز و رنگ فونت و پس‌زمینه، حالت معکوس/آینه‌ای (Mirror Mode) برای مانت‌های شیشه‌ای سخت‌افزاری و کنترل‌های پیشرفته UI/UX.",
    image: "/pics/soroushtp.jpg",
    url: "https://soroushtp.vercel.app",
    technologies: ["React", "TypeScript", "TailwindCSS", "Fullscreen API", "حالت آینه‌ای", "Web APIs", "کنترل‌های UI/UX"],
    category: "web",
    featured: true,
    badge: "⚡ ابزار رایگان جدید"
  },
  {
    id: 1,
    title: "ابریشم‌پوش - پلتفرم فروشگاهی فول‌استک",
    description: "فروشگاه سازمانی با داشبورد ادمین، APIهای Next.js، Docker روی VPS، Cloudflare DNS و سئوی کامل.",
    image: "/pics/abrishampoosh.jpg",
    url: "https://abrishampoosh.com",
    technologies: ["Next.js", "TypeScript", "Node.js", "Docker", "Cloudflare", "VPS", "TailwindCSS", "SEO"],
    category: "web",
    outOfService: true,
    notice: "خارج از دسترس، اما کدها و فایل‌ها در صورت درخواست جهت ارائه موجود است"
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
  {
    id: 6,
    title: "وایب منوز - پلتفرم هوشمند رستوران و منوی دیجیتال تعاملی",
    description: "سیستم‌عامل و منوی دیجیتال تعاملی برای کافه‌ها و رستوران‌ها؛ شامل سفارش‌گیری هوشمند با کیوآر کد، تم‌های گرافیکی اختصاصی برند، تغییر آنی قیمت‌ها و آیتم‌ها و داشبورد تحلیل رفتار مشتریان. در حال حاضر در فاز تست پایلوت مجموعه‌ها و آماده همکاری با کافه‌رستوران‌ها و جذب سرمایه مرحله بذری (Seed).",
    image: "/pics/vibemenus.jpg",
    url: "https://vibemenus.vercel.app",
    technologies: ["Next.js 15", "React", "TypeScript", "TailwindCSS", "سیستم‌های QR", "فناوری رستوران"],
    category: "web",
    isSeekingFund: true,
    badge: "🌱 فاز پایلوت و جذب سرمایه رشد",
    notice: "مرحله توسعه تجاری و پایلوت: فعال در مجموعه‌های آزمایشی. آماده عقد قراردادهای پایلوت با شبکه‌های رستورانی و پذیرش سرمایه‌گذاران مرحله بذری.",
    partnershipEmail: "soroush.qary.eemit@gmail.com"
  },
  {
    id: 7,
    title: "پروژه مشهدداک (فاز محرمانه R&D)",
    description: "پلتفرم دیجیتال در فاز توسعه محرمانه و اختصاصی (Stealth Mode). طراحی‌شده جهت ارتقا و بهینه‌سازی جریان‌های کاری با امنیت بالا. جهت حفظ حقوق مالکیت معنوی، جزئیات سازوکار تا رونمایی رسمی منتشر نمی‌گردد. آماده تعامل و دریافت پیشنهادهای همکاری استراتژیک و سرمایه‌گذاری تحت توافق محرمانگی (NDA).",
    image: "/pics/mashhadoc.jpg",
    url: "mailto:soroush.qary.eemit@gmail.com?subject=درخواست%20همکاری%20و%20سرمایه‌گذاری%20-%20پروژه%20مشهددوک",
    technologies: ["معماری اختصاصی", "پلتفرم محرمانه", "امنیت سازمانی", "توسعه Stealth"],
    category: "web",
    isStealth: true,
    badge: "🔒 پروژه محرمانه • جذب سرمایه استراتژیک",
    notice: "فاز محرمانه: اکوسیستم درمانی در حال توسعه اختصاصی. بررسی مدل تجاری و دمو صرفاً تحت توافق NDA.",
    partnershipEmail: "soroush.qary.eemit@gmail.com"
  },
]

export interface InventionInfo {
  registrationNumber: string
  uniqueId: string
  title: string
  titleFa: string
  subtitle: string
  subtitleFa: string
  description: string
  descriptionFa: string
  pillars: {
    title: string
    titleFa: string
    desc: string
    descFa: string
  }[]
  securityNote: string
  securityNoteFa: string
}

export const inventionData: InventionInfo = {
  registrationNumber: "114350",
  uniqueId: "140550340003000901",
  title: "Patented Commercial Innovation & Deal Execution Engine",
  titleFa: "اختراع رسمی ثبت‌شده در حوزه تجارت الکترونیک و معاملات",
  subtitle: "A novel patented transaction architecture for warehouse cost reduction and dynamic low-price acquisition",
  subtitleFa: "سازوکار نوین تجاری جهت کاهش هزینه‌های دپو و انبارداری و دستیابی به کمترین قیمت خرید",
  description: "A legally registered and submitted intellectual property (Patent Registration #114350 / Unique Verification ID: 140550340003000901). Formulated as a proprietary economic and transaction model that transforms traditional commerce: empowering buyers to pay less while gaining more, drastically reducing warehouse, storage, and housing overhead for factories and manufacturers, and accelerating deal closures via an intelligent auction and volume-clearing engine.",
  descriptionFa: "اختراع رسمی و ثبت‌شده تحت مالکیت معنوی به نام سروش قاری ایوری (شماره ثبت رسمی: ۱۱۴۳۵۰ / شناسه یکتای ملی: ۱۴۰۵۵۰۳۴۰۰۰۳۰۰۰۹۰۱). این دستاورد یک معماری نوین اقتصادی و سازوکار تجاری اختصاصی است که معادله خرید را دگرگون می‌کند: خریداران با پرداخت کمتر، ارزش و کالای بیشتری دریافت می‌کنند؛ هزینه‌های سنگین دپو، انبارداری و نگهداری کالا برای کارخانجات و تولیدکنندگان به شکل چشمگیری کاهش می‌یابد؛ و قراردادهای تجاری از طریق یک سامانه حراج و تسویه پیشرفته با سرعت و سهولت به نتیجه می‌رسند.",
  pillars: [
    {
      title: "Pay Less, Gain More",
      titleFa: "پرداخت کمتر، بهره‌مندی بیشتر",
      desc: "Proprietary pricing mechanics and an innovative auction structure delivering unprecedented purchasing power to buyers at record-low market costs.",
      descFa: "مکانیزم حراج و کشف قیمت نوین که به خریداران امکان می‌دهد با کمترین هزینه، بیشترین حجم کالا را با بالاترین صرفه اقتصادی تهیه کنند."
    },
    {
      title: "Factory & Warehouse Overhead Reduction",
      titleFa: "کاهش چشمگیر هزینه‌های انبارداری کارخانه‌ها",
      desc: "Minimizes dead inventory, warehouse storage fees, and capital lockup for industrial manufacturers by unlocking rapid throughput and fluid turnover.",
      descFa: "پیشگیری از رسوب سرمایه در انبارها، کاهش فوق‌العاده هزینه‌های نگهداری و انبارداری و تبدیل سریع دپوی کالا به نقدینگی فعال برای کارخانجات."
    },
    {
      title: "Frictionless Deal Closure & Liquidity",
      titleFa: "تسریع و تسهیل انعقاد معاملات تجاری",
      desc: "Streamlines negotiation cycles and unlocks instantaneous liquidity between wholesale producers and market demand through automated clearance protocols.",
      descFa: "حذف موانع و اصطکاک‌های مرسوم در معاملات کلان، همگام‌سازی عرضه مستقیم تولیدکننده با تقاضای بازار و نهایی‌سازی روان و سریع قراردادها."
    }
  ],
  securityNote: "Protected Intellectual Property: Full architectural diagrams, mathematical mechanics, and commercial projections are shared selectively under mutual Non-Disclosure Agreement (NDA) with accredited investors and strategic partners.",
  securityNoteFa: "مالکیت معنوی محفوظ: مستندات سیستمی، مدل‌های محاسباتی و بیزینس‌پلن جامع تجاری صرفاً پس از اعتبارسنجی اولیه و امضای توافق‌نامه عدم افشا (NDA) در جلسات اختصاصی ارائه می‌گردد."
}


export const personalInfo = {
  name: "Soroush Qary Ivary",
  title: "Full-Stack Architect & Patented Inventor",
  location: "Mashhad, Iran",
  experience: "3+ years",
  projectsCompleted: 10,
  patentNumber: "114350",
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
