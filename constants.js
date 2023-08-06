export const METADATA = {
  author: "José David Rocha",
  title: "Portfolio | José David Rocha",
  description:
    "José David Rocha is a recent graduate from Faculdade de Engenharia da Universidade do Porto (FEUP) with a Master's degree in Informatics and Computing Engineering. He is a software developer with a passion for frontend and backend development, game development, data mining and modeling, and sports.",
  siteUrl: "https://www.shubhporwal.me/",
  twitterHandle: "@davidrocha_9",
  keywords: [
    "José David Rocha",
    "Frontend Developer",
    "Web Developer",
    "React Native Developer",
    "Software Developer",
    "Software Engineer",
    "Portfolio",
    "Devfolio",
    "Folio",
  ].join(", "),
  image:
    "https://res.cloudinary.com/dywdhyojt/image/upload/v1690572126/preview.png",
  language: "English",
};

export const MENULINKS = [
  {
    name: "Home",
    ref: "home",
  },
  {
    name: "Education",
    ref: "education",
  },
  {
    name: "Experience",
    ref: "experience",
  },
  {
    name: "Skills",
    ref: "Skills",
  },
  {
    name: "Projects",
    ref: "Projects",
  },
];

export const TYPED_STRINGS = [
  "I'm a tech enthusiast.",
  "I'm a software developer.",
  "I'm into frontend and backend development.",
  "I'm a game developer and designer.",
  "I'm keen on data mining and modeling.",
  "I'm a die-hard FC Porto fan.",
  "I'm a passionate gamer.",
  "I'm a sports enthusiast.",
  "I'm a bookworm and avid traveler.",
  "I'm a social person.",
];

export const SOCIAL_LINKS = [
  {
    name: "mail",
    url: "mailto: davidsoutorocha@gmail.com",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/josedavidrocha/",
  },
  {
    name: "github",
    url: "https://github.com/davidrocha9",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/davidrocha9/",
  },
  {
    name: "twitter",
    url: "https://twitter.com/davidrocha_9",
  },
];

export const SKILLS = {
  languagesAndTools: [
    "html",
    "css",
    "php",
    "javascript",
    "nodejs",
    "cpp",
    "java",
    "python",
    "figma",
    "unity",
    "c-sharp",
    "webgl",
    "flutter",
    "photoshop"
  ],
  librariesAndFrameworks: [
    "react",
    "nextjs",
    "tailwindcss",
    "laravel",
    "bootstrap",
    "mui"
  ],
  databases: ["mysql", "postgresql", "mongodb", "firebase"],
  other: ["git", "docker"],
};

export const PROJECTS = [
  {
    name: "Master's Thesis",
    image: "/projects/thesis.webp",
    blurImage: "/projects/blur/airbnb-blur.webp",
    description: "Evaluation of Text Diversity over time for Automatically Generated Texts in Sports Journalism",
    gradient: ["#F14658", "#DC2537"],
    url: "https://shubh73-airbnb.vercel.app/",
    tech: ["python" ],
  },
  {
    name: "RNG - Reviews & News in Gaming",
    image: "/projects/rng.webp",
    blurImage: "/projects/blur/medium-blur.webp",
    description: "Full-Stack WebApp- News forum for gaming 🎮",
    gradient: ["#FFA62E", "#EA4D2C"],
    url: "https://github.com/davidrocha9/RNG",
    tech: ["html", "css", "bootstrap", "laravel", "postgresql", "php"],
  },
  {
    name: "Rushing B",
    image: "/projects/rushingb1.webp",
    blurImage: "/projects/blur/airbnb-blur.webp",
    description: "2D Endless Scroller Game 🚀",
    gradient: ["#000066", "#6699FF"],
    url: "https://github.com/davidrocha9/Rushing-B",
    tech: ["unity", "c-sharp"],
  },
  {
    name: "TimeHopper",
    image: "/projects/timehopper3.webp",
    blurImage: "/projects/blur/tesla-blur.webp",
    description: "3D Horde-like Game 🧟",
    gradient: ["#72b370", "#2f642e"],
    url: "https://github.com/davidrocha9/TimeHopper",
    tech: ["unity", "c-sharp"],
  },
  {
    name: "ConfMate",
    image: "/projects/confmate.webp",
    blurImage: "/projects/blur/tesla-blur.webp",
    description: "3D Horde-like Game 🧟",
    gradient: ["#142D46", "#2E4964"],
    url: "https://github.com/davidrocha9/TimeHopper",
    tech: ["flutter", "firebase"],
  }
];

export const WORK = [
  {
    id: 1,
    company: "Dukaan",
    title: "Frontend Developer",
    location: "Bangalore, Karnataka",
    range: "December - Current",
    responsibilities: [
      "Led creation of a captivating cross-platform e-commerce solution.",
      "Enhanced UX with gamification and personalized push notifications ensuring an ever-improving shopping journey.",
      "The app boasts a DAU base of 13k and an extensive MAU count of 170k.",
    ],
    url: "https://mydukaan.io/",
    video: "/work/dukaan.mp4",
  },
  {
    id: 2,
    company: "Aviate",
    title: "Frontend Developer Intern",
    location: "Goa",
    range: "May - October 2022",
    responsibilities: [
      "Built their flagship product Q-Rate, a voice-based applicant screening platform.",
      "Developed pixel-perfect responsive web applications achieving daily traffic of 1000-2000 users.",
      "Successfully rolled out an error-logging and bug reporting system that cut user-reported bugs by 30%.",
    ],
    url: "https://www.aviate.jobs/",
    video: "/work/aviate.mp4",
  },
  {
    id: 3,
    company: "Spacenos",
    title: "Web Developer Intern",
    location: "Bangalore, Karnataka",
    range: "September - December 2021",
    responsibilities: [
      "Led the Full Stack revamp on the Admin Portal.",
      "Developed app integration with REST APIs, Google Maps, User Auth, Stripe and other libraries.",
      "Implemented CRUD features for all the services and providers.",
    ],
    url: "https://spacenos.com/",
    video: "/work/spacenos.mp4",
  },
];

export const GTAG = "G-5HCTL2TJ5W";
