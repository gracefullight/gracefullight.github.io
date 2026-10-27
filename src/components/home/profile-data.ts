export const profile = {
  email: "gracefullight.dev@gmail.com",
  github: "https://github.com/gracefullight",
  intro: "Software engineer with a growing focus on AI research.",
  linkedin: "https://www.linkedin.com/in/gracefullight/",
  name: "Eunkwang Shin",
};

export const researchInterests = [
  {
    description:
      "Exploring how AI systems reason, use tools, and work together.",
    name: "AI Agents",
    number: "01",
    verb: "Reason.",
  },
  {
    description:
      "Learning representations that help machines understand the visual world.",
    name: "Computer Vision",
    number: "02",
    verb: "Perceive.",
  },
  {
    description:
      "Connecting perception and decision-making to action in the physical world.",
    name: "Robotics",
    number: "03",
    verb: "Act.",
  },
] as const;

export const researchNotes = [
  {
    category: "Agents",
    title: "Agentic SDLC",
    url: "/2026/01/31/agentic-sdlc/",
    year: "2026",
  },
  {
    category: "Vision",
    title: "Vision-Language Models for Vision Tasks",
    url: "/2025/08/16/vision-language-models-for-vision-tasks-review/",
    year: "2025",
  },
  {
    category: "Robotics",
    title: "OpenVLA",
    url: "/2025/08/29/open-vla-review/",
    year: "2025",
  },
] as const;

export const engineeringExperience = [
  {
    description:
      "Full-stack development across industry, including Hyundai Motor Company and e-commerce.",
    label: "Software engineering",
    title: "Full-stack development.",
    url: "/2025/01/01/end-of-year-retro-2024/",
  },
  {
    description:
      "Sharing code, maintaining personal projects, and documenting what I learn along the way.",
    label: "Open source",
    title: "Open-source projects.",
    url: profile.github,
  },
  {
    description:
      "Moving from industry into postgraduate AI study in Australia, with a growing interest in research.",
    label: "A new direction",
    title: "Postgraduate AI study.",
    url: "/2026/01/01/end-of-year-retro-2025/",
  },
] as const;
