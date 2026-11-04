import visionModelPreview from "@site/blog/2025/08/16/vlm-overview.png";
import robotPolicyPreview from "@site/blog/2025/08/29/open-vla-architecture.png";
import policyGradientPreview from "@site/blog/2026/10/05/clipped-surrogate.png";
import treeSearchPreview from "@site/blog/2026/10/25/mcts-steps.png";

export const profile = {
  email: "gracefullight.dev@gmail.com",
  github: "https://github.com/gracefullight",
  intro:
    "Software engineer studying AI in Sydney. I write about agents, vision, and robot learning.",
  linkedin: "https://www.linkedin.com/in/gracefullight/",
  name: "Eunkwang Shin",
};

export const researchNotes = [
  {
    category: "Agents",
    summary:
      "Reading notes on agent-led development, from intent and implementation to human review and deployment.",
    title: "Agentic SDLC",
    url: "/2026/01/31/agentic-sdlc/",
    year: "2026",
  },
  {
    category: "Vision",
    summary:
      "A paper review of image and text representations, pretraining objectives, and adaptation to visual tasks.",
    title: "Vision-Language Models for Vision Tasks",
    url: "/2025/08/16/vision-language-models-for-vision-tasks-review/",
    year: "2025",
  },
  {
    category: "Robotics",
    summary:
      "A review of OpenVLA's visual encoders, action tokens, and adaptation of a robot policy.",
    title: "OpenVLA",
    url: "/2025/08/29/open-vla-review/",
    year: "2025",
  },
] as const;

export const researchInterests = [
  {
    controlLabel: "Agents",
    description: researchNotes[0].summary,
    name: "AI Agents",
    verb: "Reason.",
    workLinkLabel: "Read the agentic development notes",
    workSummary: researchNotes[0].summary,
    workTitle: "Agentic development.",
    workUrl: researchNotes[0].url,
  },
  {
    controlLabel: "Vision",
    description: researchNotes[1].summary,
    name: "Computer Vision",
    verb: "Perceive.",
    workLinkLabel: "Read the vision-language review",
    workSummary: researchNotes[1].summary,
    workTitle: "Vision-language models.",
    workUrl: researchNotes[1].url,
  },
  {
    controlLabel: "Robotics",
    description: researchNotes[2].summary,
    name: "Robotics",
    verb: "Act.",
    workLinkLabel: "Read the OpenVLA review",
    workSummary: researchNotes[2].summary,
    workTitle: "Language to robot actions.",
    workUrl: researchNotes[2].url,
  },
] as const;

export const selectedWork = [
  {
    action: "Read the vision-language review",
    image: visionModelPreview,
    imageAlt:
      "Taxonomy of vision-language pretraining, transfer learning, and knowledge distillation.",
    imageHeight: 728,
    imageWidth: 1400,
    kind: "Paper review",
    summary:
      "How image and text representations are learned together, and adapted to visual recognition tasks.",
    title: "Vision-language models",
    url: researchNotes[1].url,
  },
  {
    action: "Read the OpenVLA review",
    image: robotPolicyPreview,
    imageAlt:
      "OpenVLA architecture connecting image and language inputs to robot actions.",
    imageHeight: 366,
    imageWidth: 915,
    kind: "Paper review",
    summary:
      "Visual encoders, action tokens, and adaptation in an open vision-language-action model.",
    title: "OpenVLA",
    url: researchNotes[2].url,
  },
  {
    action: "Read the planning notes",
    image: treeSearchPreview,
    imageAlt:
      "Monte Carlo tree search diagram showing selection, expansion, rollout, and backup.",
    imageHeight: 672,
    imageWidth: 2182,
    kind: "Study notes",
    summary:
      "Selection, expansion, rollout, and backup, within a wider review of reinforcement learning.",
    title: "Monte Carlo tree search",
    url: "/2026/10/25/rl-012/",
  },
  {
    action: "Read the policy optimization notes",
    image: policyGradientPreview,
    imageAlt:
      "Plots explaining the clipped surrogate objective used in proximal policy optimization.",
    imageHeight: 1252,
    imageWidth: 3562,
    kind: "Study notes",
    summary:
      "Policy gradients, variance reduction with a critic, and the clipped PPO objective.",
    title: "Policy gradients and PPO",
    url: "/2026/10/05/rl-010/",
  },
] as const;

export const engineeringExperience = [
  {
    action: "Read my 2024 retrospective",
    description:
      "Full-stack software development in e-commerce and at Hyundai Motor Company, followed by a move toward AI study.",
    hrefLang: "ko",
    label: "Software engineering",
    title: "Hyundai and e-commerce.",
    url: "/2025/01/01/end-of-year-retro-2024/",
  },
  {
    action: "View oh-my-agent",
    description:
      "A portable multi-agent harness for reusable skills, workflows, and coding-agent teams.",
    hrefLang: "en",
    label: "Open source",
    title: "oh-my-agent.",
    url: `${profile.github}/oh-my-agent`,
  },
  {
    action: "Read my 2025 retrospective",
    description:
      "A retrospective on leaving industry and moving to Sydney for postgraduate study in AI.",
    hrefLang: "ko",
    label: "AI study",
    title: "AI study in Sydney.",
    url: "/2026/01/01/end-of-year-retro-2025/",
  },
] as const;

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
  return /[\uac00-\ud7a3]/u.test(text) ? "ko" : "en";
}
