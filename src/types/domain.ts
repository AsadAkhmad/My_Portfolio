import type {
  Profile,
  SocialLink,
  Experience,
  Education,
  Project,
  ProjectImage,
  Skill,
  Certification,
} from "@/generated/prisma";

export type { Profile, SocialLink, Experience, Education, Skill, Certification };
export type ProjectWithImages = Project & { images: ProjectImage[] };
