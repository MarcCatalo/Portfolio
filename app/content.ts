import {
  Activity,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Database,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

export const profile = {
  name: "Marc Joshua Catalo",
  role: "Mobile and Web Application Developer",
  headline:
    "I build backend systems, admin tools, and mobile app features for startup and enterprise products.",
  location: "Philippines",
  email: "catalomj@gmail.com",
  phone: "+63 939 777 9892",
  linkedin: "https://www.linkedin.com/in/catalomarc/",
  summary:
    "Backend developer with experience building APIs, database structures, integrations, and operational workflows across healthcare, agriculture, fitness, and job platform products.",
};

export const navItems = ["Work", "Projects", "Skills", "Contact"];

export const stats = [
  { value: "2024", label: "BSIT graduate" },
  { value: "4", label: "Projects handled" },
];

export const work = [
  {
    company: "AHG Lab / Sandlot Technology Ventures Inc.",
    role: "Backend Developer",
    period: "July 2024 - June 2026",
    icon: BriefcaseBusiness,
    details: [
      "Developed backend systems, REST APIs, database structures, and integrations for mobile and web applications.",
      "Delivered product workflows across healthcare, fitness, agriculture, and job board platforms.",
      "Supported user-facing and administrative features through debugging, data validation, and workflow updates.",
    ],
  },
  {
    company: "AHG Lab",
    role: "Software Development Intern",
    period: "February 2024 - June 2024",
    icon: GraduationCap,
    details: [
      "Supported GoGym backend development using Xano for mobile and administration workflows.",
      "Worked with Firebase, Supabase, GCP, Figma, and Linear during product development.",
      "Contributed to authentication, gym access, memberships, coach sessions, and workout tracking features.",
    ],
  },
];

export const projects = [
  {
    title: "SLMC Ehub",
    period: "2025 - 2026",
    type: "Enterprise healthcare platform",
    stack: ["GCP", "Firebase Firestore", "JavaScript", "Docker"],
    logo: "/project-logos/slmc-medical-center.png",
    accent: "cyan",
    description:
      "Backend development for patient-facing and administrative workflows at St. Luke's Medical Center.",
    highlights: [
      "Developed patient enrollment, information management, payment, and dashboard features.",
      "Built and maintained endpoint integrations for patient-facing and admin-facing applications.",
      "Resolved production issues involving patient records, services, post-operation details, and payment statuses.",
      "Improved reliability through issue tracing, data validation, debugging, and workflow updates.",
    ],
  },
  {
    title: "Hijo Hydroponics App",
    period: "2025",
    type: "Agriculture management system",
    stack: ["Supabase", "Python", "Docker"],
    logo: "/project-logos/hijo-hydroponics.png",
    accent: "green",
    description:
      "Hydroponics management platform for tracking farms, greenhouses, crops, resources, crop programs, and daily activities.",
    highlights: [
      "Developed farm, greenhouse, crop, resource, crop program, and activity management features.",
      "Updated database tables for crop lifecycles, greenhouse assignments, resources, and user tasks.",
      "Implemented crop program generation and scheduling using templates, rules, dates, and admin configuration.",
      "Built endpoints for farm operations, crop planning, and task management.",
    ],
  },
  {
    title: "GoGym App",
    period: "2024",
    type: "Fitness mobile and admin apps",
    stack: ["Xano", "Firebase"],
    logo: "/project-logos/gogym.png",
    accent: "amber",
    description:
      "Backend systems for authentication, gym access, memberships, coach sessions, workout progress, and administration.",
    highlights: [
      "Built endpoints and database structures for mobile and administration workflows.",
      "Enhanced subscription, booking, user activity, and coach session business logic.",
      "Supported active membership tracking and sales-related reporting.",
    ],
  },
  {
    title: "Fastr App",
    period: "2024",
    type: "Job board web app",
    stack: ["Supabase", "Python"],
    logo: "/project-logos/fastr.jpeg",
    accent: "violet",
    description:
      "Backend development and production support for a job board web application.",
    highlights: [
      "Debugged job posting, search and filtering, applications, user accounts, and admin workflows.",
      "Created and updated endpoints and database schemas.",
      "Implemented revisions and resolved reported issues across user-facing and admin-facing features.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "JavaScript", "TypeScript", "C++"],
  },
  {
    title: "Frameworks",
    icon: Activity,
    skills: ["React", "Django", "jQuery", "Next.js"],
  },
  {
    title: "Platforms & Data",
    icon: Database,
    skills: ["Xano", "Supabase", "Firebase", "Firestore", "GCP"],
  },
  {
    title: "Developer Tools",
    icon: BadgeCheck,
    skills: [
      "Docker",
      "Postman",
      "GitHub",
      "Figma",
      "Linear",
      "Cursor",
      "Codex",
      "Claude",
      "Antigravity",
    ],
  },
];

export const strengths = [
  "Backend systems",
  "REST API development",
  "Database design",
  "Data validation",
  "Issue tracing",
  "Workflow integrations",
];

export const education = {
  school: "Technological Institute of the Philippines",
  degree: "Bachelor of Science in Information Technology",
  year: "Graduated 2024",
};

export const contactLinks = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replaceAll(" ", "")}`, icon: Phone },
  { label: "LinkedIn", value: "linkedin.com/in/catalomarc", href: profile.linkedin, icon: ExternalLink },
  { label: "Location", value: profile.location, href: "#", icon: MapPin },
];

export const principles = [
  {
    title: "Dependable Systems",
    description: "I prefer clear schemas, predictable workflows, and backend logic that is easy to maintain.",
    icon: ShieldCheck,
  },
  {
    title: "Product Awareness",
    description: "I connect implementation details to how users and teams actually move through a product.",
    icon: Activity,
  },
  {
    title: "Calm Delivery",
    description: "I work through debugging, handoffs, and revisions with steady technical analysis.",
    icon: BadgeCheck,
  },
];
