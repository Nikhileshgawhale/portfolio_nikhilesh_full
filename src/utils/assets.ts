export const getAssetUrl = (path: string): string => {
  const normalized = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
};

export const RESUME_PATH = "documents/resume.pdf";
export const RESUME_FILENAME = "Nikhilesh_Gawhale_Resume.pdf";

export const downloadResume = (): void => {
  const link = document.createElement("a");
  link.href = getAssetUrl(RESUME_PATH);
  link.download = RESUME_FILENAME;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const viewResume = (): void => {
  window.open(getAssetUrl(RESUME_PATH), "_blank", "noopener,noreferrer");
};
