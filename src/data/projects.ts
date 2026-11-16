import { Project, ProjectCategory } from "@/types";
import rawData from "./portfolioData.json";

export const projectCategories = [
  "All Works",
  "Photography",
  "Graphic Design",
  "Cinematography",
  "Video Editing",
  "Motion Graphics",
  "AI Films",
  "Commercial Advertising",
  "Branding",
] as const;

export const projectsData: Project[] = rawData.projects as unknown as Project[];

export const scrollingArcConfig = rawData.scrollingArcConfig;

export default projectsData;
