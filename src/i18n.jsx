import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const translations = {
  fr: {
    nav: {
      hero: "Accueil",
      about: "À propos",
      skills: "Compétences",
      experience: "Expérience",
      leadership: "Leadership",
      certifications: "Certifications",
      education: "Formation",
      blogs: "Blogs",
      contact: "Contact",
    },
    hero: {
      location: "// Sousse, Tunisie",
      subtitle1: "Software Engineer",
      subtitle2: "Full-Stack Developer",
      subtitle3: "Cloud & AI Enthusiast",
      description:
        "Étudiant en Génie Logiciel, je conçois des solutions full-stack et cloud qui passent du concept au déploiement. Trois certifications AWS, deux stages, et une curiosité qui ne s'éteint jamais.",
      cta: "Télécharger mon CV",
    },
    about: {
      title: "C'est quoi",
      titleHighlight: "un ingénieur logiciel",
      titleEnd: " ?",
      subtitle:
        "// les questions que tout le monde se pose (mais n'ose pas poser)",
      qa: [
        {
          q: "Tu peux pirater le Facebook de quelqu'un ?",
          a: "Non. Et même si je pouvais, je ne le ferais pas. Par contre, je peux te construire une plateforme bancaire sécurisée avec JWT, authentification multi-facteurs et chiffrement de bout en bout. C'est presque aussi impressionnant, mais légal.",
        },
        {
          q: "Mais concrètement, tu fais quoi ?",
          a: "Je code des applications web de A à Z — du bouton que tu cliques jusqu'à l'infrastructure cloud qui tourne derrière. Full-stack, cloud, un peu d'IA agentique. En gros, je transforme des idées en logiciel qui fonctionne.",
        },
        {
          q: "C'est quoi « full-stack » exactement ?",
          a: "C'est quand tu fais le front (ce que tu vois) ET le back (ce que tu ne vois pas). React côté utilisateur, Spring Boot ou Flask côté serveur, Docker pour que ça tourne partout, AWS pour que ça scale. Le couteau suisse du dev.",
        },
        {
          q: "Et l'IA dans tout ça ? Tu fais des robots ?",
          a: "Pas des robots qui prennent le monde. Des agents intelligents avec LangChain et CrewAI qui raisonnent, cherchent de l'information et agissent. C'est le bonus — construire des assistants qui ne répondent pas juste « je ne sais pas ».",
        },
        {
          q: "Pourquoi tu fais ça rather que de devenir médecin ?",
          a: "Parce qu'un bug en médecine coûte cher, et un bug en code se fixe avec un git revert. Plus sérieusement, j'adore résoudre des problèmes complexes et voir mes solutions utilisées par de vraies personnes.",
        },
      ],
      summary:
        "Étudiant en ingénierie logicielle à la FST Tunis, j'ai développé une approche polyvalente du développement. Mes stages chez DRAEXLMAIER Group et Satoripop m'ont appris à construire des plateformes robustes — de l'automatisation RH aux systèmes bancaires. Trois certifications AWS validées, et toujours en train d'apprendre quelque chose de nouveau.",
    },
    skills: {
      title: "Compétences",
      titleHighlight: "par domaine",
      subtitle: "// technologies que j'utilise au quotidien",
      domains: {
        fullstack: "Full-Stack",
        cloud: "Cloud & DevOps",
        ai: "Data & AI",
        db: "Bases de données",
      },
    },
    experience: {
      title: "Expérience",
      titleHighlight: "pro",
      subtitle: "// stages et projets qui comptent",
      items: [
        {
          title: "Software Engineer Intern",
          company: "DRAEXLMAIER Group",
          period: "Jul — Août 2025",
          description:
            "Développement d'une plateforme low-code d'automatisation des processus RH. Conception et implémentation d'une architecture modulaire permettant la création rapide d'applications métier sans code.",
          tags: ["Low-code", "Automatisation", "Architecture modulaire"],
        },
        {
          title: "Web Developer Intern",
          company: "Satoripop Inc.",
          period: "Jul — Août 2024",
          description:
            "Plateforme bancaire de prise de rendez-vous avec Spring Boot & Angular. Développement d'APIs RESTful sécurisées avec authentification JWT et intégration de services bancaires existants.",
          tags: ["Spring Boot", "Angular", "APIs REST", "JWT"],
        },
      ],
    },
    leadership: {
      title: "Engagement &",
      titleHighlight: "Leadership",
      subtitle: "// au-delà du code",
      items: [
        {
          title: "Junior Consultant",
          org: "OPTIMA Junior Enterprise",
          description:
            "Migration du tech-stack de plateformes Eventra et Glutenia. Audit technique, refonte d'architecture et mise en place de bonnes pratiques de développement.",
        },
        {
          title: "Hackathon ML & Juge Technique",
          org: "ATIA — Tunisian Association of AI",
          description:
            "Participation à des hackathons de Machine Learning. Évaluation technique des projets et mentorat d'équipes universitaires.",
        },
      ],
    },
    certifications: {
      title: "Certifications",
      titleHighlight: "& badges",
      subtitle: "// validées et à jour",
    },
    education: {
      title: "Formation",
      subtitle: "// parcours académique",
      items: [
        {
          degree: "Génie Logiciel",
          school: "Faculté des Sciences de Tunis (FST)",
          period: "2023 — Mai 2027 (prévu)",
          description:
            "Formation d'ingénieur en génie logiciel. Spécialisation en architecture logicielle, systèmes distribués et intelligence artificielle.",
        },
        {
          degree: "Baccalauréat — Mathématiques",
          school: "Lycée Tahar Sfar",
          period: "Juin 2022",
          description:
            "Mention Bien. Orientation mathématiques et sciences physiques.",
        },
      ],
    },
    contact: {
      title: "Travaillons",
      titleHighlight: "ensemble",
      subtitle: "// contactez-moi",
      availability:
        "Disponible pour un stage ou une alternance à partir de 2026",
      cta: "Télécharger mon CV",
      cards: {
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
    },
    blogs: {
      title: "Derniers",
      titleHighlight: "posts",
      subtitle: "// architecture, cloud, apprentissages terrain",
      items: [
        {
          badge: "Architecture",
          readTime: "4 min",
          title: "De projet étudiant à vraie décision d'architecture",
          excerpt:
            "Comment choisir entre vitesse de livraison et qualité technique sans sur-ingénierie.",
          tags: ["architecture", "tradeoffs", "delivery"],
        },
        {
          badge: "Backend",
          readTime: "5 min",
          title: "APIs propres en stage : ce qui marche vraiment",
          excerpt:
            "Des conventions simples pour sécuriser, documenter et faire évoluer une API sans douleur.",
          tags: ["spring", "api", "clean-code"],
        },
        {
          badge: "Cloud",
          readTime: "3 min",
          title: "AWS mindset : penser coût, fiabilité, observabilité",
          excerpt:
            "Les réflexes cloud que j'aurais aimé avoir avant mes premières mises en prod.",
          tags: ["aws", "devops", "reliability"],
        },
      ],
    },
    footer: {
      built: "Buildé avec",
    },
    stats: {
      certifications: "Certifications",
      experience: "Années d'expérience",
      projects: "Projets réalisés",
      technologies: "Technologies",
    },
  },
  en: {
    nav: {
      hero: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      leadership: "Leadership",
      certifications: "Certifications",
      education: "Education",
      blogs: "Blogs",
      contact: "Contact",
    },
    hero: {
      location: "// Sousse, Tunisia",
      subtitle1: "Software Engineer",
      subtitle2: "Full-Stack Developer",
      subtitle3: "Cloud & AI Enthusiast",
      description:
        "Software engineering student designing full-stack and cloud solutions from concept to deployment. Three AWS certifications, two internships, and an insatiable curiosity.",
      cta: "Download my CV",
    },
    about: {
      title: "What is a",
      titleHighlight: "software engineer",
      titleEnd: "?",
      subtitle: "// questions everyone asks (but is too polite to)",
      qa: [
        {
          q: "Can you hack into someone's Facebook?",
          a: "No. And even if I could, I wouldn't. But I can build you a secured banking platform with JWT, multi-factor authentication, and end-to-end encryption. Almost as impressive, but legal.",
        },
        {
          q: "But seriously, what do you do?",
          a: "I build web applications from A to Z — from the button you click to the cloud infrastructure running behind it. Full-stack, cloud, a bit of AI agentics. Basically, I turn ideas into working software.",
        },
        {
          q: "What does 'full-stack' even mean?",
          a: "It means I do the front (what you see) AND the back (what you don't). React on the user side, Spring Boot or Flask on the server, Docker to run it everywhere, AWS to scale it. The Swiss Army knife of dev.",
        },
        {
          q: "And AI? Do you build robots?",
          a: "Not world-domination robots. Smart agents with LangChain and CrewAI that reason, search for information, and take action. It's the bonus — building assistants that don't just reply 'I don't know'.",
        },
        {
          q: "Why not become a doctor instead?",
          a: "Because a bug in medicine costs a lot, and a bug in code gets fixed with a git revert. More seriously, I love solving complex problems and seeing my solutions used by real people.",
        },
      ],
      summary:
        "Software engineering student at FST Tunis, I've developed a versatile approach to development. My internships at DRAEXLMAIER Group and Satoripop taught me to build robust platforms — from HR automation to banking systems. Three AWS certifications earned, and still learning something new every day.",
    },
    skills: {
      title: "Skills",
      titleHighlight: "by domain",
      subtitle: "// technologies I use daily",
      domains: {
        fullstack: "Full-Stack",
        cloud: "Cloud & DevOps",
        ai: "Data & AI",
        db: "Databases",
      },
    },
    experience: {
      title: "Work",
      titleHighlight: "Experience",
      subtitle: "// internships and projects that matter",
      items: [
        {
          title: "Software Engineer Intern",
          company: "DRAEXLMAIER Group",
          period: "Jul — Aug 2025",
          description:
            "Development of a low-code platform for HR process automation. Designed and implemented a modular architecture enabling rapid creation of business applications without code.",
          tags: ["Low-code", "Automation", "Modular Architecture"],
        },
        {
          title: "Web Developer Intern",
          company: "Satoripop Inc.",
          period: "Jul — Aug 2024",
          description:
            "Banking appointment platform with Spring Boot & Angular. Developed secured RESTful APIs with JWT authentication and integration with existing banking services.",
          tags: ["Spring Boot", "Angular", "REST APIs", "JWT"],
        },
      ],
    },
    leadership: {
      title: "Engagement &",
      titleHighlight: "Leadership",
      subtitle: "// beyond the code",
      items: [
        {
          title: "Junior Consultant",
          org: "OPTIMA Junior Enterprise",
          description:
            "Tech-stack migration for Eventra and Glutenia platforms. Technical audit, architecture redesign, and implementation of development best practices.",
        },
        {
          title: "ML Hackathon & Technical Judge",
          org: "ATIA — Tunisian Association of AI",
          description:
            "Participated in Machine Learning hackathons. Technical evaluation of projects and mentoring university teams.",
        },
      ],
    },
    certifications: {
      title: "Certifications",
      titleHighlight: "& badges",
      subtitle: "// verified and up to date",
    },
    education: {
      title: "Education",
      subtitle: "// academic background",
      items: [
        {
          degree: "Software Engineering",
          school: "Faculty of Sciences of Tunis (FST)",
          period: "2023 — May 2027 (expected)",
          description:
            "Engineering degree in software engineering. Specialization in software architecture, distributed systems, and artificial intelligence.",
        },
        {
          degree: "Baccalauréat — Mathematics",
          school: "Lycée Tahar Sfar",
          period: "June 2022",
          description: "Honors. Mathematics and physical sciences track.",
        },
      ],
    },
    contact: {
      title: "Let's",
      titleHighlight: "work together",
      subtitle: "// get in touch",
      availability: "Available for an internship starting 2026",
      cta: "Download my CV",
      cards: {
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
    },
    blogs: {
      title: "Latest",
      titleHighlight: "posts",
      subtitle: "// architecture, cloud, and practical lessons",
      items: [
        {
          badge: "Architecture",
          readTime: "4 min",
          title: "From student project to real architecture decisions",
          excerpt:
            "How to balance shipping speed and engineering quality without overengineering.",
          tags: ["architecture", "tradeoffs", "delivery"],
        },
        {
          badge: "Backend",
          readTime: "5 min",
          title: "Clean APIs from internship reality",
          excerpt:
            "Simple conventions to secure, document, and evolve APIs with less friction.",
          tags: ["spring", "api", "clean-code"],
        },
        {
          badge: "Cloud",
          readTime: "3 min",
          title: "AWS mindset: cost, reliability, observability",
          excerpt:
            "Cloud reflexes I wish I had before my first production deployments.",
          tags: ["aws", "devops", "reliability"],
        },
      ],
    },
    footer: {
      built: "Built with",
    },
    stats: {
      certifications: "Certifications",
      experience: "Years of experience",
      projects: "Projects completed",
      technologies: "Technologies",
    },
  },
  ar: {
    nav: {
      hero: "الرئيسية",
      about: "نبذة عني",
      skills: "المهارات",
      experience: "الخبرة",
      leadership: "القيادة",
      certifications: "الشهادات",
      education: "التعليم",
      blogs: "المدونة",
      contact: "التواصل",
    },
    hero: {
      location: "// سوسة، تونس",
      subtitle1: "مهندس برمجيات",
      subtitle2: "مطور واجهات أمامية وخلفية",
      subtitle3: "هاوي للسحابة والذكاء الاصطناعي",
      description:
        "طالب هندسة برمجيات أصمم حلول واجهات أمامية وخلفية وسحابة تنتقل من المفهوم إلى النشر. ثلاث شهادات AWS، وstageان، وفضول لا ينطفئ أبداً.",
      cta: "تحميل السيرة الذاتية",
    },
    about: {
      title: "ماذا يعني أن تكون",
      titleHighlight: "مهند برمجيات",
      titleEnd: " ؟",
      subtitle: "// الأسئلة التي يطرحها الجميع (لكن لا يجرؤ على طرحها)",
      qa: [
        {
          q: "هل يمكنك اختراق فيسبوك شخص ما؟",
          a: "لا. وحتى لو استطعت، لن أفعل. لكن يمكنني بناء منصة مصرفية آمنة مع JWT والتحقق متعدد العوامل والتشفير من الطرف إلى الطرف. تقريباً بنفس الإثارة، لكن قانونياً.",
        },
        {
          q: "لكن بجد، ماذا تفعل؟",
          a: "أبني تطبيقات الويب من أ إلى ي — من الزر الذي تنقره إلى البنية التحتية السحابية التي تعمل خلفها. واجهات أمامية وخلفية، سحابة، قليلاً من وكائل الذكاء الاصطناعي. باختصار، أحوّل الأفكار إلى برمجيات تعمل.",
        },
        {
          q: "ماذا يعني 'Full-Stack' بالضبط؟",
          a: "يعني أنني أفعل الواجهة الأمامية (ما تراه) والخلفية (ما لا تراه). React لجانب المستخدم، Spring Boot أو Flask لجانب الخادم، Docker لتشغيله في كل مكان، AWS لتوسيعه. السكين السويسرية للمطورين.",
        },
        {
          q: "والذكاء الاصطناعي؟ هل تبني روبوتات؟",
          a: "ليس روبوتات تستحوذ على العالم. وكلاء أذكياء باستخدام LangChain وCrewAI يفكرون ويبحثون عن معلومات ويتصرفون. إنه المكافأة — بناء مساعدين لا يردّون فقط 'لا أعرف'.",
        },
        {
          q: "لماذا لا تصبح طبيباً بدلاً من ذلك؟",
          a: "لأن الخطأ في الطب يكلف غالياً، والخطأ في البرمجة يتم إصلاحه بـ git revert. أكثر جدية، أحب حل المشكلات المعقدة ورؤية حلولي تُستخدم من قبل أشخاص حقيقيين.",
        },
      ],
      summary:
        "طالب هندسة برمجيات في كلية العلوم بتونس، طورت نهجاً متعدد التخصصات للبرمجة. stageاي في DRAEXLMAIER Group وSatoripop علّماني بناء منصات قوية — من أتمتة الموارد البشرية إلى الأنظمة المصرفية. ثلاث شهادات AWS معتمدة، وأتعلم شيئاً جديداً كل يوم.",
    },
    skills: {
      title: "المهارات",
      titleHighlight: "حسب المجال",
      subtitle: "// التقنيات التي أستخدمها يومياً",
      domains: {
        fullstack: "واجهات أمامية وخلفية",
        cloud: "السحابة و DevOps",
        ai: "البيانات والذكاء الاصطناعي",
        db: "قواعد البيانات",
      },
    },
    experience: {
      title: "الخبرة",
      titleHighlight: "المهنية",
      subtitle: "// stageان ومشاريع مهمة",
      items: [
        {
          title: "مهندس برمجيات - متدرب",
          company: "DRAEXLMAIER Group",
          period: "يوليو — أغسطس 2025",
          description:
            "تطوير منصة low-code لأتمتة عمليات الموارد البشرية. تصميم وتنفيذ بنية معمارية معيارية تتيح إنشاء تطبيقات عمل سريعة بدون برمجة.",
          tags: ["Low-code", "أتمتة", "بنية معيارية"],
        },
        {
          title: "مطور ويب - متدرب",
          company: "Satoripop Inc.",
          period: "يوليو — أغسطس 2024",
          description:
            "منصة حجز مواعيد مصرفية باستخدام Spring Boot وAngular. تطوير واجهات RESTful آمنة مع مصادقة JWT ودمج الخدمات المصرفية الموجودة.",
          tags: ["Spring Boot", "Angular", "واجهات REST", "JWT"],
        },
      ],
    },
    leadership: {
      title: "المشاركة وال",
      titleHighlight: "القيادة",
      subtitle: "// ما وراء الكود",
      items: [
        {
          title: "مستشار مبتدئ",
          org: "OPTIMA Junior Enterprise",
          description:
            "ترحيل مجموعة تقنيات منصات Eventra وGlutenia. مراجعة تقنية، إعادة هيكلة البنية التحتية، وتطبيق أفضل ممارسات التطوير.",
        },
        {
          title: "هاكاثون ML وقاضٍ فني",
          org: "ATIA — الجمعية التونسية للذكاء الاصطناعي",
          description:
            "المشاركة في هاكاثونات تعلم الآلة. التقييم الفني للمشاريع وإرشاد الفرق الجامعية.",
        },
      ],
    },
    certifications: {
      title: "الشهادات",
      titleHighlight: "والrongnons",
      subtitle: "// موثقة ومحدّثة",
    },
    education: {
      title: "التعليم",
      subtitle: "// المسار الأكاديمي",
      items: [
        {
          degree: "هندسة البرمجيات",
          school: "كلية العلوم بتونس (FST)",
          period: "2023 — مايو 2027 (المتوقع)",
          description:
            "شهادة هندسة في هندسة البرمجيات. تخصص في هندسة البرمجيات والأنظمة الموزعة والذكاء الاصطناعي.",
        },
        {
          degree: "بكالوريا — رياضيات",
          school: "ثانوية الطاهر السFar",
          period: "يونيو 2022",
          description: "بميزة جيد. مسار الرياضيات والعلوم الفيزيائية.",
        },
      ],
    },
    contact: {
      title: "لنعمل",
      titleHighlight: "معاً",
      subtitle: "// تواصل معي",
      availability: "متاح لstage bắt đầu من 2026",
      cta: "تحميل السيرة الذاتية",
      cards: {
        email: "البريد الإلكتروني",
        linkedin: "لينكدإن",
        github: "غيت هب",
      },
    },
    blogs: {
      title: "أحدث",
      titleHighlight: "المقالات",
      subtitle: "// هندسة البرمجيات والسحابة والدروس العملية",
      items: [
        {
          badge: "الهندسة",
          readTime: "4 دقائق",
          title: "من مشروع طالب إلى قرار معماري حقيقي",
          excerpt: "كيف توازن بين سرعة التسليم وجودة الهندسة بدون تعقيد زائد.",
          tags: ["architecture", "tradeoffs", "delivery"],
        },
        {
          badge: "الخلفية",
          readTime: "5 دقائق",
          title: "واجهات API نظيفة من واقع التدريب",
          excerpt: "قواعد بسيطة لتأمين وتوثيق وتطوير الـ API بسهولة.",
          tags: ["spring", "api", "clean-code"],
        },
        {
          badge: "السحابة",
          readTime: "3 دقائق",
          title: "عقلية AWS: الكلفة والموثوقية والمراقبة",
          excerpt: "عادات سحابية تمنيت لو عرفتها قبل أول نشر إنتاجي.",
          tags: ["aws", "devops", "reliability"],
        },
      ],
    },
    footer: {
      built: "بُني بـ",
    },
    stats: {
      certifications: "الشهادات",
      experience: "سنوات الخبرة",
      projects: "المشاريع المنجزة",
      technologies: "التقنيات",
    },
  },
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-lang") || "fr";
    }
    return "fr";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (path) => {
      const keys = path.split(".");
      let result = translations[lang];
      for (const key of keys) {
        result = result?.[key];
      }
      return result || path;
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}

export const LANGUAGES = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ar", label: "عربي", flag: "🇹🇳" },
];
