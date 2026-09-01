import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReadingProgress from "../../components/ReadingProgress";
import { projects, getProject } from "../../data/projects";
import styles from "./caseStudy.module.css";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const title = `${project.title} / Case study`;
  return {
    title,
    description: project.caseStudy.intro,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description: project.caseStudy.intro,
      type: "article",
      url: `/work/${project.slug}`,
      images: [{ url: project.screenshot }],
    },
  };
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <>
      <ReadingProgress />
      <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/work" className={styles.back}>
          ← All case studies
        </Link>

        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.intro}>{caseStudy.intro}</p>

        <dl className={styles.meta}>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.tags.join(", ")}</dd>
          </div>
        </dl>

        <div className={styles.links}>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            Live demo
          </a>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              {project.backend ? "Frontend source" : "Source code"}
            </a>
          )}
          {project.backend && (
            <a href={project.backend} target="_blank" rel="noopener noreferrer">
              Backend source
            </a>
          )}
        </div>
      </header>

      {project.screenshot && (
        <figure className={styles.shot}>
          <Image
            src={project.screenshot}
            alt={`Screenshot of the ${project.title} interface`}
            width={project.screenshotWidth}
            height={project.screenshotHeight}
            sizes="(max-width: 900px) 100vw, 736px"
          />
        </figure>
      )}

      <main className={styles.body}>
        {caseStudy.sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2>{section.heading}</h2>

            {section.body?.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            {section.decisions && (
              <ul className={styles.decisions}>
                {section.decisions.map((decision) => (
                  <li key={decision.title}>
                    <h3>{decision.title}</h3>
                    <p>{decision.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </main>

      <footer className={styles.footer}>
        <Link href="/work" className={styles.back}>
          ← All case studies
        </Link>
      </footer>
      </div>
    </>
  );
}
