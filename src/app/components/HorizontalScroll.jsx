"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClickToPlayVideo from "./ClickToPlayVideo";
import styles from "./HorizontalScroll.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "MOSIR",
    description: "Interactive 3D globe built with Three.js, plotting language data onto a wireframe sphere from Natural Earth GeoJSON. Custom marker placement by lat/long, a generated starfield, and damped orbital controls over a responsive WebGL canvas.",
    url: "https://mariomhz.github.io/mosir/",
    github: "https://github.com/mariomhz/mosir",
    image: "/portraits/gradient1.webp",
    screenshot: "/projects/mosir-screenshot.webp",
    tags: ["Three.js", "JavaScript", "WebGL", "HTML"],
  },
  {
    id: 2,
    title: "SKYABOVE",
    description: "Flight dashboard with a Next.js API route proxying AviationStack so the API key never reaches the browser. Adds a 30-minute in-memory cache, per-IP rate limiting with 429 responses, and a stale-cache fallback that keeps serving data when the upstream API fails. Fully typed response contracts, GSAP stat transitions.",
    url: "https://skyabove-dashboard.vercel.app",
    github: "https://github.com/mariomhz/skyabove",
    image: "/portraits/gradient2.webp",
    screenshot: "/projects/skyabove-screenshot.webp",
    tags: ["Next.js", "TypeScript", "REST API", "Caching", "Rate Limiting", "GSAP"],
  },
  {
    id: 3,
    title: "MICULTURA",
    description: "Fullstack cultural events platform for Tenerife — my TFC (Trabajo Fin de Ciclo) for the DAW programme. Next.js 16 App Router frontend with an interactive Leaflet map and FullCalendar view, paired with a Spring Boot REST API featuring JWT auth, refresh-token rotation, and PostgreSQL persistence.",
    url: "https://pi-25-26-frontend-opal.vercel.app/",
    // TODO: point at the public mirror
    github: null,
    image: "/portraits/gradient6.webp",
    screenshot: "/projects/micultura-screenshot.webp",
    tags: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "JWT Auth", "Leaflet", "Tailwind CSS"],
  }
];

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      "JavaScript", "TypeScript", "Java", "C#",
      "SQL", "HTML5 & CSS3"
    ]
  },
  {
    title: "Web & Interfaces",
    skills: [
      "React", "Next.js", "Tailwind CSS",
      "Responsive Design & Accessibility",
      "Web Performance & SEO"
    ]
  },
  {
    title: "Backend & Systems",
    skills: [
      "Spring Boot", ".NET", "Node.js", "REST APIs & JWT Auth",
      "MySQL & PostgreSQL", "Linux", "Docker",
      "Git & CI/CD"
    ]
  },
  {
    title: "Creative & Motion",
    skills: [
      "Three.js & WebGL",
      "GSAP",
      "Figma"
    ]
  }
];

const languages = [
  { code: "ES", name: "Spanish", level: "Native" },
  { code: "PT", name: "Portuguese", level: "Native" },
  { code: "IT", name: "Italian", level: "Native" },
  { code: "EN", name: "English", level: "C2" },
  { code: "CA", name: "Catalan", level: "C1" },
  { code: "FR", name: "French", level: "B2" },
  { code: "ASL", name: "American Sign Language", level: "B2" },
  { code: "NO", name: "Norwegian", level: "A2" },
];

const languageReel = null;
// const languageReel = {
//   sources: [
//     { src: "/videos/languages-av1.mp4", type: "video/mp4; codecs=av01.0.05M.08" },
//     { src: "/videos/languages.mp4", type: "video/mp4" },
//   ],
//   poster: "/videos/languages-poster.webp",
//   captions: "/videos/languages.en.vtt",
// };

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    if (reducedMotion) return;

    const timer = setTimeout(() => {
      const scrollDistance = wrapper.scrollWidth - window.innerWidth;

      const tween = gsap.to(wrapper, {
        x: -scrollDistance,
        ease: "none",
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => "+=" + scrollDistance,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
      });

      container._scrollTrigger = scrollTrigger;
      container._tween = tween;

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (container._scrollTrigger) {
        container._scrollTrigger.kill();
        container._scrollTrigger = null;
      }
      if (container._tween) {
        container._tween.kill();
        container._tween = null;
      }
      gsap.set(wrapper, { clearProps: "transform" });
    };
  }, [isMobile, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={styles.horizontalSection + " projects"}
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="sr-only">
        Skills and selected projects
      </h2>
      <div
        ref={containerRef}
        className={
          styles.horizontalContainer +
          (reducedMotion ? " " + styles.staticScroll : "")
        }
      >
        <div ref={wrapperRef} className={styles.horizontalWrapper}>
          {/* Skills Panel */}
          <div className={styles.panel + " " + styles.skillsPanel}>
            <div className={styles.skillsContent}>
              <h3 className={styles.skillsTitle}>Tech Skills</h3>
              <p className={styles.skillsCredential}>
                Técnico Superior en Desarrollo de Aplicaciones Web (DAW), 2026
              </p>
              {skillCategories.map((category) => (
                <div key={category.title} className={styles.skillCategory}>
                  <h4 className={styles.skillCategoryTitle}>{category.title}</h4>
                  <ul className={styles.skillsList}>
                    {category.skills.map((skill) => (
                      <li key={skill}>/ {skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className={styles.scrollHint}>
              <span>Scroll to explore projects</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </p>
          </div>

          {/* Languages Panel */}
          <div className={styles.panel + " " + styles.languagesPanel}>
            <div className={styles.languagesContent}>
              <h3 className={styles.skillsTitle}>Languages</h3>
              <p className={styles.skillsCredential}>
                Happy to interview in any of them
              </p>
              <div className={styles.languagesLayout}>
                <ul className={styles.languageList}>
                  {languages.map((language) => (
                    <li key={language.code} className={styles.languageRow}>
                      <span className={styles.languageCode}>{language.code}</span>
                      <span className={styles.languageName}>{language.name}</span>
                      <span className={styles.languageLevel}>{language.level}</span>
                    </li>
                  ))}
                </ul>

                {languageReel && (
                  <div className={styles.languageReel}>
                    <ClickToPlayVideo
                      sources={languageReel.sources}
                      poster={languageReel.poster}
                      captions={languageReel.captions}
                      label="Watch me speak all eight"
                      aspectRatio="9 / 16"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project Panels */}
          {projects.map((project, index) => {
            const hasUrl = Boolean(project.url) && project.url !== "#";

            const media = (
              <>
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.gradientImage}
                />
                {project.screenshot && (
                  <Image
                    src={project.screenshot}
                    alt={"Screenshot of the " + project.title + " interface"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.screenshotImage}
                  />
                )}
              </>
            );

            return (
              <div key={project.id} className={styles.panel + " " + styles.projectPanel}>
                <article className={styles.projectCard}>
                  {hasUrl ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        styles.projectImageWrapper +
                        (hoveredProject === project.id ? " " + styles.hovered : "")
                      }
                      tabIndex={-1}
                      aria-hidden="true"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      {media}
                    </a>
                  ) : (
                    <div className={styles.projectImageWrapper}>{media}</div>
                  )}
                  <div className={styles.projectInfo}>
                    <span className={styles.projectNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={styles.projectTitle}
                      {...(hasUrl && {
                        onMouseEnter: () => setHoveredProject(project.id),
                        onMouseLeave: () => setHoveredProject(null),
                      })}
                    >
                      {hasUrl ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onFocus={() => setHoveredProject(project.id)}
                          onBlur={() => setHoveredProject(null)}
                        >
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    <ul className={styles.projectTags}>
                      {project.tags.map((tag) => (
                        <li key={tag} className={styles.tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.projectLinks}>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        Live Demo
                        <span className="sr-only"> for {project.title}</span>
                      </a>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          Source Code
                          <span className="sr-only"> for {project.title}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}

          {/* CTA Panel */}
          <div className={styles.panel + " " + styles.ctaPanel}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>See more on GitHub</h3>
              <a href="https://github.com/mariomhz" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
                github.com/mariomhz
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
