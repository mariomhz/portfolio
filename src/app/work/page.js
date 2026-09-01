import Link from "next/link";
import { projects } from "../data/projects";
import styles from "./index.module.css";

export const metadata = {
  title: "Work / José Mario Hernández",
  description:
    "Case studies for MiCultura, SkyAbove and MOSIR: what the problem was, what I decided, what broke and what I would change.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  const studies = projects.filter((project) => project.caseStudy);

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Back home
      </Link>

      <h1 className={styles.title}>Work</h1>
      <p className={styles.intro}>
        Three projects, written up properly. What the problem was, what I
        decided and why, what broke, and what I would do differently.
      </p>

      <ul className={styles.list}>
        {studies.map((project) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`} className={styles.card}>
              <span className={styles.cardYear}>{project.year}</span>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <p className={styles.cardIntro}>{project.caseStudy.intro}</p>
              <span className={styles.cardCta}>Read case study →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
