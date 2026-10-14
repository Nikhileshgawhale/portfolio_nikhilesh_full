export type SectionId = "about" | "experience" | "projects" | "blog" | "skills" | "contact";
export type View = SectionId | "home";

export const sections: { id: SectionId; label: string; hint: string }[] = [
  { id: "about", label: "About", hint: "The neon sign" },
  { id: "experience", label: "Experience", hint: "The workstation" },
  { id: "projects", label: "Projects", hint: "The server racks" },
  { id: "blog", label: "Blog", hint: "The bookshelf" },
  { id: "skills", label: "Skills", hint: "The neural core" },
  { id: "contact", label: "Contact", hint: "The terminal" },
];

type Vec3 = [number, number, number];

export const cameraPoses: Record<View, { position: Vec3; target: Vec3 }> = {
  home: { position: [0, 2.6, 10.5], target: [0, 1.9, 0] },
  about: { position: [0, 3.3, 1.2], target: [0, 3.4, -5.8] },
  experience: { position: [-1.6, 2.1, 1.6], target: [-4.4, 1.6, -1.8] },
  projects: { position: [1.4, 2.1, 1.8], target: [4.6, 1.5, -1.6] },
  blog: { position: [-1.9, 2.0, 5.6], target: [-4.9, 1.1, 2.1] },
  skills: { position: [0.4, 2.5, 5.4], target: [0, 2.1, 0] },
  contact: { position: [1.4, 1.9, 7.0], target: [3.6, 1.25, 3.6] },
};
