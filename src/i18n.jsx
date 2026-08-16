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
        "Étudiant en ingénierie informatique spécialisé en génie logiciel, passionné par le développement d'architectures full-stack et cloud scalables, appliquant les bonnes pratiques de system design et les tendances actuelles.",
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
          q: "Pourquoi tu fais ça plutôt que de devenir médecin ?",
          a: "Parce qu'un bug en médecine coûte cher, et un bug en code se fixe avec un git revert. Plus sérieusement, j'adore résoudre des problèmes complexes et voir mes solutions utilisées par de vraies personnes.",
        },
      ],
      summary:
        "Étudiant en ingénierie logicielle à la FST Tunis, j'ai développé une approche polyvalente du développement. Mes stages chez DRAEXLMAIER Group et Satoripop m'ont appris à construire des plateformes robustes — de l'automatisation RH aux systèmes bancaires. Trois certifications AWS validées, et toujours en train d'apprendre quelque chose de nouveau.",
    },
    skills: {
      title: "Compétences",
      titleHighlight: "par domaine",
      subtitle: "// ma stack 2026",
      domains: {
        frontend: "Frontend",
        backend: "Backend",
        devops: "Infra & DevOps",
        learning: "En apprentissage",
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
          tags: ["Low-code", "Automatisation", "Power Platform", "Architecture modulaire"],
          pdfUrl: "/files/internships/Stage DRAEXLMAIER Group.pdf",
          imageSrc: "",
        },
        {
          title: "Web Developer Intern",
          company: "Satoripop Inc.",
          period: "Jul — Août 2024",
          description:
            "Plateforme bancaire de prise de rendez-vous avec Spring Boot & Angular. Développement d'APIs RESTful sécurisées avec authentification JWT et intégration de services bancaires existants.",
          tags: ["Spring Boot", "Angular", "APIs REST", "JWT"],
          pdfUrl: "/files/internships/Satoripop Angular.pdf",
          imageSrc: "/images/internships/satoripop.jpg",
        },
        {
          title: "Galylio AI",
          company: "Galylio AI",
          period: "2026",
          description:
            "Chez Galylio AI, j'ai développé la plateforme Tdiscount, un marketplace pour les vendeurs et ambassadeurs de produits. J'ai conçu et développé la plateforme avec des architectures scalables, en appliquant les concepts de sécurité, de CI/CD, d'accessibilité et de testing.",
          tags: ["Full-Stack", "System design", "Test SonarQube", "Security"],
          pdfUrl: "",
          imageSrc: "",
        },
      ],
    },
    leadership: {
      title: "Engagement &",
      titleHighlight: "Leadership",
      subtitle: "// au-delà du code",
      optima: {
        role: "Junior Consultant",
        org: "OPTIMA Junior Enterprise",
        period: "Membre Junior-Entreprise",
        description:
          "Migration du tech-stack des plateformes Eventra et Glutenia : audit technique, refonte d'architecture et mise en place de bonnes pratiques de développement.",
      },
      hackathons: {
        title: "Hackathons",
        org: "Pitchs & compétitions",
        description:
          "Participation à des hackathons Machine Learning et innovation : conception du produit, pitch devant un jury et mentorat d'équipes universitaires. Mes pitchs sont consultables ci-dessous.",
        viewPitch: "Voir le pitch",
      },
      clubs: "Clubs universitaires",
    },
    certifications: {
      title: "Certifications",
      titleHighlight: "& badges",
      subtitle: "// validées et en préparation",
      earned: "Validée",
      preparing: "En préparation",
      all: "Tous",
      earnedStat: "validées",
      preparingStat: "en préparation",
      viewPdf: "Voir le certificat",
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
            "Formation d'ingénieur en génie logiciel. Spécialisation en architecture logicielle, systèmes distribués et intelligence artificielle. Note cumulative (GPA) : 15,89/20 (jusqu'à présent).",
        },
        {
          degree: "Baccalauréat — Mathématiques",
          school: "Lycée Tahar Sfar",
          period: "Juin 2022",
          description:
            "Baccalauréat section Mathématiques, session principale, avec la mention très bien (17,3/20).",
        },
      ],
    },
    contact: {
      title: "Travaillons",
      titleHighlight: "ensemble",
      subtitle: "// contactez-moi",
      availability:
        "Disponible pour un stage à partir de 2026",
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
      built: "Construit avec",
    },
    stats: {
      certifications: "Certifications",
      experience: "Années d'expérience",
      projects: "Projets réalisés",
      technologies: "Technologies",
    },
    theme: {
      dark: [
        "Dark mode activé... toujours rien ne change. C'est une fonctionnalité, pas un bug.",
        "Dark mode ON — déjà sombre, mais merci pour le clic. C'est une fonctionnalité, pas un bug.",
        "Mode sombre : le changement, c'est pour les autres. C'est une fonctionnalité, pas un bug.",
      ],
      light: [
        "Light mode activé... la lumière arrive, promis. C'est une fonctionnalité, pas un bug.",
        "Light mode ON — tu vois la différence ? Moi non plus. C'est une fonctionnalité, pas un bug.",
        "Mode clair : presque aussi sombre qu'avant. C'est une fonctionnalité, pas un bug.",
      ],
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
      subtitle: "// my 2026 stack",
      domains: {
        frontend: "Frontend",
        backend: "Backend",
        devops: "Infra & DevOps",
        learning: "Learning",
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
          pdfUrl: "/files/internships/Stage DRAEXLMAIER Group.pdf",
          imageSrc: "",
        },
        {
          title: "Web Developer Intern",
          company: "Satoripop Inc.",
          period: "Jul — Aug 2024",
          description:
            "Banking appointment platform with Spring Boot & Angular. Developed secured RESTful APIs with JWT authentication and integration with existing banking services.",
          tags: ["Spring Boot", "Angular", "REST APIs", "JWT"],
          pdfUrl: "/files/internships/Satoripop Angular.pdf",
          imageSrc: "/images/internships/satoripop.jpg",
        },
        {
          title: "Galylio AI",
          company: "Galylio AI",
          period: "2026",
          description:
            "At Galylio AI, I built the Tdiscount platform, a marketplace for sellers and product ambassadors. I designed and developed the platform with scalable architectures, applying security, CI/CD, accessibility, and testing best practices.",
          tags: ["Full-Stack", "System design", "SonarQube testing", "Security"],
          pdfUrl: "",
          imageSrc: "",
        },
      ],
    },
    leadership: {
      title: "Engagement &",
      titleHighlight: "Leadership",
      subtitle: "// beyond the code",
      optima: {
        role: "Junior Consultant",
        org: "OPTIMA Junior Enterprise",
        period: "Junior-Enterprise member",
        description:
          "Tech-stack migration for the Eventra and Glutenia platforms: technical audit, architecture redesign, and implementation of development best practices.",
      },
      hackathons: {
        title: "Hackathons",
        org: "Pitches & competitions",
        description:
          "Participation in Machine Learning and innovation hackathons: product design, pitching in front of a jury, and mentoring university teams. My pitches are available below.",
        viewPitch: "View pitch",
      },
      clubs: "University clubs",
    },
    certifications: {
      title: "Certifications",
      titleHighlight: "& badges",
      subtitle: "// verified and in progress",
      earned: "Earned",
      preparing: "In progress",
      all: "All",
      earnedStat: "earned",
      preparingStat: "in progress",
      viewPdf: "View certificate",
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
    theme: {
      dark: [
        "Dark mode on... still nothing changes. It's a feature, not a bug.",
        "Dark mode ON — already dark, but thanks for the click. It's a feature, not a bug.",
        "Dark mode: change is for other sites. It's a feature, not a bug.",
      ],
      light: [
        "Light mode on... the light is coming, promise. It's a feature, not a bug.",
        "Light mode ON — see any difference? Me neither. It's a feature, not a bug.",
        "Light mode: almost as dark as before. It's a feature, not a bug.",
      ],
    },
  },
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio-lang");
      return translations[stored] ? stored : "fr";
    }
    return "fr";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-lang", lang);
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
];
