export const profile = {
  name: "Nikhilesh Gawhale",
  title: "AI Engineer",
  tagline: "Generative AI, LLMs, RAG and Agentic Systems",
  location: "London, England · Remote",
  email: "nikhileshgawhale711@gmail.com",
  github: "https://github.com/Nikhileshgawhale",
  linkedin: "https://www.linkedin.com/in/nikhilesh-gawhale",
  summary:
    "AI Engineer with three years of professional software engineering experience, including eighteen months building and deploying production Generative AI, LLM and agentic AI systems for a regulated investment banking technology platform. MSc Artificial Intelligence (Distinction), Queen Mary University of London.",
  summaryMore:
    "I deliver end-to-end AI solutions — RAG pipelines, multi-agent orchestration, prompt engineering and fine-tuning — together with the evaluation frameworks, guardrails and monitoring that make them production-ready and auditable. Strong Python and SQL, hands-on with AWS and Azure, and AI-native in how I work: I use coding agents like Claude Code and Cursor daily to build, test and ship. Comfortable turning ambiguous business problems into scoped, production-grade solutions and explaining them to technical and non-technical people alike.",
};

export const stats = [
  { value: "3 yrs", label: "Professional engineering" },
  { value: "70→80%", label: "Accuracy lift via evals" },
  { value: ".64→.74", label: "Macro-F1 improvement" },
  { value: "MSc", label: "AI · Distinction, QMUL" },
];

export const experience = [
  {
    period: "Jan 2025 – Aug 2026",
    title: "AI Engineer",
    company: "RP-Tech International Solutions",
    location: "Remote · Investment Banking Technology",
    points: [
      "Designed, developed and deployed production-grade Generative AI and agentic AI applications for a regulated financial services platform, owning delivery end to end from ambiguous business problem to production and ongoing improvement.",
      "Architected RAG pipelines over large volumes of unstructured documents — ingestion, chunking strategy, embeddings, hybrid retrieval and re-ranking — with verification that outputs were grounded in and traceable to source text.",
      "Built multi-step agentic workflows and multi-agent systems with LangGraph and LangChain: tool calling into internal systems and databases, memory, retries, fallbacks and human-in-the-loop approval gates.",
      "Fine-tuned language models with LoRA on 10,000+ financial documents, including dataset preparation, training and held-out evaluation.",
      "Built the evaluation framework governing production releases: a 500-document labelled benchmark with per-class precision, recall and F1 and CI regression tests, improving accuracy from 70% to 80% and macro-F1 from 0.64 to 0.74.",
      "Implemented guardrails and monitoring — prompt-injection defence, schema-validated output, scoped access controls, human review gates and immutable audit logging — meeting compliance and Responsible AI requirements.",
      "Built Python/FastAPI REST APIs and microservices integrating AI with enterprise systems, deployed via Docker and Kubernetes with CI/CD across AWS and Azure and full observability for latency, throughput and cost.",
      "Used AI coding agents such as Claude Code throughout development for implementation, tests, debugging and docs, with critical review of all generated output; documented reusable patterns and prompt templates adopted across later projects.",
    ],
  },
  {
    period: "Aug 2024 – Dec 2024",
    title: "Generative AI Engineer",
    company: "Midas Advisory",
    location: "London, United Kingdom",
    points: [
      "Built RAG pipelines and Generative AI features in Python and FastAPI for client-facing use cases, deployed through Docker and CI/CD.",
      "Fine-tuned LLMs with LoRA on a domain-specific corpus of 10,000+ financial documents, evaluated against a held-out set.",
      "Built n8n workflow automations connecting multiple business tools end to end for client operations.",
    ],
  },
  {
    period: "Aug 2022 – Sep 2023",
    title: "Software Developer",
    company: "Global Technologies",
    location: "Pune, India",
    points: [
      "Built and deployed production Python services, REST APIs and ML data pipelines in an Agile team with automated testing and CI/CD.",
      "Developed anomaly detection and predictive monitoring models over large operational datasets, improving system reliability by 45%.",
    ],
  },
];

export const education = [
  {
    degree: "MSc Artificial Intelligence — Distinction",
    school: "Queen Mary University of London, UK",
    period: "Sep 2023 – Sep 2024 · Deep Learning 90%, ML Algorithms 89%, Bayesian NNs 88%, NLP 85%",
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
      "Agentic system for insurance policy review — clause comparison against standard wordings, deviation and risk flagging, and precedent retrieval, with every finding traced to source text. Built solo, largely with Claude Code, and evaluated on per-class F1 and retrieval precision because different errors carry different real-world costs.",
    tech: ["Python", "Azure OpenAI", "Azure AI Search", "MongoDB", "Event-driven"],
    link: "https://github.com/Nikhileshgawhale/underwriter-copilot",
    featured: true,
  },
  {
    title: "Multi-Agent LLM Workflow Assistant",
    description:
      "Planner, Researcher, Coder and QA agents share Redis-backed state, retrieve context from a vector database, and pass work through a QA gate that scores output before release.",
    tech: ["Python", "FastAPI", "Redis", "Vector DB", "Claude", "OpenAI"],
    link: "https://github.com/Nikhileshgawhale/multi_agent_llm",
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
    name: "Generative AI & LLMs",
    items: ["Claude", "OpenAI GPT", "Azure OpenAI", "AWS Bedrock", "Gemini", "Prompt engineering", "Structured outputs", "Function calling", "LoRA fine-tuning", "Context engineering"],
  },
  {
    name: "Agentic & Multi-Agent Systems",
    items: ["LangGraph", "LangChain", "CrewAI", "AutoGen", "MCP servers", "Planning & memory", "Retries & fallbacks", "Human-in-the-loop"],
  },
  {
    name: "RAG & Vector Search",
    items: ["Chunking & embeddings", "Hybrid dense + sparse", "Re-ranking", "pgvector", "Milvus", "Azure AI Search", "Semantic search"],
  },
  {
    name: "Evaluation & Governance",
    items: ["Gold sets", "Per-class P / R / F1", "LLM-judge & calibration", "CI regression tests", "Tracing & monitoring", "Guardrails", "Prompt-injection defence", "Audit logging"],
  },
  {
    name: "Engineering & Data",
    items: ["Python", "asyncio", "FastAPI", "Pydantic v2", "pytest", "SQL", "TypeScript", "Angular", "Microservices", "Event-driven", "ETL", "MongoDB", "Redis"],
  },
  {
    name: "ML, Cloud & DevOps",
    items: ["PyTorch", "scikit-learn", "Transformers", "AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions", "GitLab CI", "Terraform", "n8n"],
  },
];
