export const profile = {
  name: "Nikhilesh Gawhale",
  title: "Generative AI / Machine Learning Engineer",
  tagline: "RAG, LLM Fine-Tuning and Production ML Pipelines",
  location: "Pune, India · Remote",
  email: "nikhileshgawhale711@gmail.com",
  github: "https://github.com/Nikhileshgawhale",
  linkedin: "https://www.linkedin.com/in/nikhilesh-gawhale",
  summary:
    "Generative AI / Machine Learning Engineer with an MSc in Artificial Intelligence (Distinction) from Queen Mary University of London and three years of hands-on experience designing, building and productionizing GenAI systems end to end.",
  summaryMore:
    "Eighteen months building Retrieval-Augmented Generation pipelines, LLM-based architectures and agentic workflows for a regulated financial services platform — including fine-tuning pre-trained language models for domain-specific use cases. Comfortable owning a problem end to end with high independence, in a fast-moving environment with real business outcomes to hit.",
};

export const stats = [
  { value: "3 yrs", label: "Building GenAI systems" },
  { value: "70→80%", label: "Accuracy lift via evals" },
  { value: "10k", label: "Docs in LoRA fine-tune corpus" },
  { value: "MSc", label: "AI · Distinction, QMUL" },
];

export const experience = [
  {
    period: "Jan 2025 – Aug 2026",
    title: "AI Engineer",
    company: "RP-Tech International Solutions",
    location: "Remote · Investment Banking Technology",
    points: [
      "Designed, built and productionized Generative AI and agentic systems for a regulated financial services platform, owning the pipeline end to end from training and fine-tuning through deployment and monitoring.",
      "Built RAG pipelines and LLM-based architectures over large volumes of unstructured documents: ingestion, chunking strategy, embeddings, hybrid retrieval and re-ranking, with grounding checks verifying outputs against source text.",
      "Fine-tuned pre-trained language models using LoRA on a 10,000-document financial corpus, covering dataset preparation, training and held-out evaluation.",
      "Evaluated and benchmarked models with a 500-document labelled corpus and per-class metrics, raising accuracy from 70% to 80%; shipped proof-of-concept GenAI systems that progressed into production.",
      "Monitored deployed models and improved reliability, deploying via Docker and Kubernetes on AWS and Azure with full observability for latency, throughput and cost.",
    ],
  },
  {
    period: "Aug 2024 – Dec 2024",
    title: "Generative AI Engineer",
    company: "Midas Advisory",
    location: "London, United Kingdom",
    points: [
      "Fine-tuned language models using LoRA on a corpus of over 10,000 financial documents.",
      "Built RAG pipelines and LLM features in Python and FastAPI, deployed via Docker and CI/CD.",
    ],
  },
  {
    period: "Aug 2022 – Sep 2023",
    title: "Software Developer",
    company: "Global Technologies",
    location: "Pune, India",
    points: [
      "Delivered production Python backend services with REST API integrations and a PostgreSQL data layer.",
      "Designed predictive monitoring and anomaly-detection pipelines, improving operational reliability by 45%.",
    ],
  },
];

export const education = [
  {
    degree: "MSc Artificial Intelligence — Distinction",
    school: "Queen Mary University of London, UK",
    period: "Sep 2023 – Sep 2024",
  },
  {
    degree: "BCA — Bachelor of Computer Applications",
    school: "Shivaji Science College, Amravati, India",
    period: "Aug 2019 – Aug 2022 · GPA 7.8/10",
  },
];

export const projects = [
  {
    title: "Underwriter Copilot",
    description:
      "Agentic system for insurance policy review — clause comparison, deviation flagging and precedent retrieval. Built solo, end to end, and evaluated on per-class F1 and retrieval precision rather than a single accuracy figure.",
    tech: ["Python", "Azure OpenAI", "Azure AI Search", "MongoDB", "Event-driven"],
    link: "https://github.com/Nikhileshgawhale/underwriter-copilot",
    featured: true,
  },
  {
    title: "AI Shopping Assistant",
    description:
      "NLP-powered shopping assistant for product discovery, price comparison and AI-driven purchase recommendations.",
    tech: ["Python", "NLP", "Web Scraping", "APIs"],
    link: "https://github.com/Nikhileshgawhale/ai-shopping-assistant",
  },
  {
    title: "Instagram Motivation Bot",
    description:
      "Generates motivational quotes with a local Ollama LLM, renders videos with custom overlays and posts them automatically.",
    tech: ["Python", "Flask", "OpenCV", "Ollama", "Docker"],
    link: "https://github.com/Nikhileshgawhale/instagram-motivation-bot",
  },
  {
    title: "E-commerce with Django",
    description:
      "Full-featured store with authentication, cart, payments and an admin dashboard.",
    tech: ["Django", "PostgreSQL", "JavaScript"],
    link: "https://github.com/Nikhileshgawhale/E-commerce-Platform-Development-with-Django",
  },
];

export const skillGroups = [
  {
    name: "GenAI & LLM Architectures",
    items: ["RAG in production", "Chunking & embeddings", "Hybrid retrieval", "Re-ranking", "Prompt engineering", "Structured outputs", "Claude", "OpenAI", "Azure OpenAI", "AWS Bedrock"],
  },
  {
    name: "Fine-Tuning & Evaluation",
    items: ["LoRA", "Dataset preparation", "Held-out evaluation", "Gold sets", "Per-class P / R / F1", "LLM-judge scoring", "Calibration", "CI regression tests"],
  },
  {
    name: "Agentic Systems",
    items: ["LangGraph", "LangChain", "CrewAI", "Model Context Protocol", "Tool calling", "Memory & orchestration"],
  },
  {
    name: "Engineering & MLOps",
    items: ["Python", "asyncio", "FastAPI", "Pydantic v2", "pytest", "Docker", "Kubernetes", "AWS", "Azure", "CI/CD", "PostgreSQL", "MongoDB", "Redis"],
  },
];
