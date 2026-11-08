export const profile = {
  email: "gracefullight.dev@gmail.com",
  github: "https://github.com/gracefullight",
  intro:
    "Software engineer with 10+ years of production experience, now studying a Master of AI at UTS in Sydney.",
  linkedin: "https://www.linkedin.com/in/gracefullight/",
  name: "Eunkwang Shin",
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
};

export const experience: readonly Experience[] = [
  {
    company: "FIRST FLUKE",
    location: "Remote",
    period: "2026 — Now",
    role: "Co-founder & CTO",
    summary:
      "Building and running production AI B2B SaaS with retrieval pipelines and agentic workflows, across legal research, local-business intelligence, and content operations. Selected as a 2026 AI solution provider for Korea's Modoo Startup initiative.",
  },
  {
    company: "Hyundai Motor Group",
    location: "Seoul",
    period: "2024 — 2025",
    role: "Frontend / Platform Engineer",
    summary:
      "Built frontend systems for the HMG Product Platform, including an in-memory configurator that validates millions of trim, option, and accessory combinations in near real time, and contributed to the Hyundai Design System.",
  },
  {
    company: "Cafe24",
    location: "Seoul",
    period: "2018 — 2023",
    role: "Senior Frontend Engineer",
    summary:
      "Led frontend standardisation and the Cafe24 Design System while modernising a 20-year-old storefront, improved PageSpeed by about 20% across hundreds of thousands of stores, and shipped the Seller-fit recommendation service.",
  },
  {
    company: "Glotrek Trade · INBET",
    location: "Seoul",
    period: "2015 — 2018",
    role: "Full-Stack Engineer",
    summary:
      "Built a cosmetics e-commerce platform with React and AWS, and Real-packing, a WebRTC logistics inspection platform that went on to receive angel investment from Lotte.",
  },
  {
    company: "ROK Defence Communication Command",
    location: "Gwacheon",
    period: "2013 — 2015",
    role: "Software Engineer, military service",
    summary:
      "Developed software for the Korea Defence Command & Control System and a Presidential Security Service evidence-collection system.",
  },
];

export type Project = {
  title: string;
  meta: string;
  summary: string;
  url?: string;
};

export const projects: readonly Project[] = [
  {
    meta: "Open source · 1,200+ stars",
    summary:
      "A multi-agent harness for long-running coding work, with persistent workflows, verification gates, and append-only execution logs.",
    title: "oh-my-agent",
    url: "https://github.com/first-fluke/oh-my-agent",
  },
  {
    meta: "Open source · 200+ stars",
    summary:
      "A full-stack monorepo spanning Next.js, FastAPI, Flutter, and Terraform, with typed API clients and shared design tokens.",
    title: "fullstack-starter",
    url: "https://github.com/first-fluke/fullstack-starter",
  },
  {
    meta: "UTS Tech Fest 2026 · AI Showcase nominee",
    summary:
      "On-device sewer defect detection: a fine-tuned YOLO model (mAP@0.5 of 0.931) running entirely in the browser with ONNX Runtime Web and WebGPU.",
    title: "FlowBust",
  },
  {
    meta: "BESC 2026 · Accepted paper, co-author",
    summary:
      "A hybrid GNN framework that reconstructs indoor 5G signal strength from aerial-only UAV RF sensing, with a Three.js voxel view of the coverage.",
    title: "Graph-XGB",
  },
];

export type Education = {
  title: string;
  school: string;
  period: string;
  detail?: string;
};

export const education: readonly Education[] = [
  {
    detail:
      "Research Assistant · Course average 88% · Dean's List 2026 · Academic Excellence International Scholarship",
    period: "2025 — 2027",
    school: "University of Technology Sydney",
    title: "Master of Artificial Intelligence",
  },
  {
    period: "2018",
    school: "National Institute for Lifelong Education",
    title: "Bachelor of Computer Science",
  },
];

// Homepage display titles; article titles and permanent URLs stay in the blog.
const writingTitles: Record<string, string> = {
  "contact-interview-slides": "Preparing a PhD interview presentation",
  "ippr-003": "Image features and Harris corner detection",
  "rl-006": "Monte Carlo prediction and control",
  "rl-007": "Temporal-difference learning and Q-learning",
  "rl-008": "Approximating value functions",
  "rl-009": "Deep Q-learning and function approximation",
  "rl-010": "Policy gradients, actor-critic, and PPO",
  "rl-011": "Model-based planning and RLHF",
  "rl-012": "Reinforcement learning review",
};

export function getWritingTitle(title: string, permalink: string) {
  const slug = permalink.split("/").filter(Boolean).at(-1) ?? "";
  return writingTitles[slug] ?? title;
}

export function getTextLanguage(text: string) {
  return /[가-힣]/u.test(text) ? "ko" : "en";
}
