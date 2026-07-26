import {
  getProfile,
  getSocialLinks,
  getExperience,
  getEducation,
  getProjects,
  getSkillsByCategory,
  getCertifications,
} from "@/lib/db/queries";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/shared/Badge";
import { Timeline } from "@/components/recruiter/Timeline";
import { EducationList } from "@/components/recruiter/EducationList";
import { ProjectCard } from "@/components/recruiter/ProjectCard";
import { SkillsMatrix } from "@/components/recruiter/SkillsMatrix";
import { CertificationList } from "@/components/recruiter/CertificationList";
import { ContactSection } from "@/components/recruiter/ContactSection";

export default async function PortfolioPage() {
  const [profile, socialLinks, experience, education, projects, skills, certifications] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getExperience(),
    getEducation(),
    getProjects(),
    getSkillsByCategory(),
    getCertifications(),
  ]);

  if (!profile) return null;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section id="about" className="scroll-mt-24 pb-20">
        <SectionHeading eyebrow="About Me" title="A bit about who I am" />
        <div className="grid gap-8 sm:grid-cols-3">
          <p className="sm:col-span-2 leading-relaxed text-foreground/90">{profile.longBio}</p>
          <div className="space-y-4 rounded-xl border border-border bg-card p-5 text-sm">
            <div>
              <p className="font-semibold uppercase tracking-wide text-accent">Degree</p>
              <p className="mt-1 text-muted-foreground">
                {profile.degree}, {profile.university}
              </p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wide text-accent">Career Goals</p>
              <p className="mt-1 text-muted-foreground">{profile.careerGoals}</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wide text-accent">Interests</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {profile.interests.map((i) => (
                  <Badge key={i}>{i}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 pb-20">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <Timeline items={experience} />
      </section>

      <section id="education" className="scroll-mt-24 pb-20">
        <SectionHeading eyebrow="Education" title="Academic background" />
        <EducationList items={education} />
      </section>

      <section id="projects" className="scroll-mt-24 pb-20">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="End-to-end data science and ML projects — from raw data to a shipped decision."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 pb-20">
        <SectionHeading eyebrow="Skills" title="What I work with" />
        <SkillsMatrix skills={skills} />
      </section>

      <section id="certifications" className="scroll-mt-24 pb-20">
        <SectionHeading eyebrow="Certifications & Achievements" title="Hackathons, courses & leadership" />
        <CertificationList items={certifications} />
      </section>

      <section id="contact" className="scroll-mt-24">
        <SectionHeading eyebrow="Contact" title="Get in touch" />
        <ContactSection profile={profile} socialLinks={socialLinks} />
      </section>
    </main>
  );
}
