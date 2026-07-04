"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HorizontalScroll.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "MOSIR",
    description: "Interactive 3D globe built with Three.js and custom WebGL shaders, visualizing language data with smooth orbital controls and responsive canvas rendering.",
    url: "https://mariomhz.github.io/mosir/",
    github: "https://github.com/mariomhz/mosir",
    image: "/portraits/gradient1.jpg",
    screenshot: "/projects/mosir-screenshot.jpg",
    tags: ["Three.js", "JavaScript", "WebGL", "HTML"],
  },
  {
    id: 2,
    title: "SKYABOVE",
    description: "Flight dashboard with a Next.js backend that proxies the AviationStack REST API, implements server-side caching, and serves typed data to a responsive UI with animated stat transitions.",
    url: "https://skyabove-dashboard.vercel.app",
    github: "https://github.com/mariomhz/skyabove",
    image: "/portraits/gradient2.jpg",
    screenshot: "/projects/skyabove-screenshot.jpg",
    tags: ["Next.js", "TypeScript", "REST API", "Tailwind CSS", "GSAP"],
  },
  {
    id: 3,
    title: "MICULTURA",
    description: "Fullstack cultural events platform for Tenerife — my TFC (Trabajo Fin de Ciclo) for the DAW programme. Next.js 16 App Router frontend with an interactive Leaflet map and FullCalendar view, paired with a Spring Boot REST API featuring JWT auth, refresh-token rotation, and PostgreSQL persistence.",
    url: "https://pi-25-26-frontend-opal.vercel.app/",
    github: "https://github.com/mariomhz/pi-25-26-frontend-opal",
    image: "/portraits/gradient6.png",
    tags: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "JWT Auth", "Leaflet", "Tailwind CSS"],
  }
];

const skillCategories = [
  {
    title: "Creative & Motion",
    skills: [
      "Creative coding & generative art",
      "Three.js & WebGL",
      "GLSL shaders",
      "GSAP",
      "Processing (Java)",
      "p5.js",
      "TouchDesigner (learning)",
      "Blender (learning)",
      "Figma"
    ]
  },
  {
    title: "Web & Interfaces",
    skills: [
      "JavaScript (ES2025)", "TypeScript", "React", "Next.js",
      "HTML5 & CSS3", "Tailwind CSS",
      "Responsive Design & Accessibility",
      "Web Performance & SEO",
      "State Management"
    ]
  },
  {
    title: "Backend & Infrastructure",
    skills: [
      "Node.js", "REST APIs & JWT Auth", "Spring Boot",
      "PostgreSQL & MySQL", "Docker",
      "Git & CI/CD"
    ]
  }
];

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
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
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    const timer = setTimeout(() => {
      const scrollDistance = wrapper.scrollWidth - window.innerWidth;

      const tween = gsap.to(wrapper, {
        x: -scrollDistance,
        ease: "none",
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance}`,
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
      }
      if (container._tween) {
        container._tween.kill();
      }
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className={`${styles.horizontalSection} projects`}>
      <div ref={containerRef} className={styles.horizontalContainer}>
        <div ref={wrapperRef} className={styles.horizontalWrapper}>
          {/* Skills Panel */}
          <div className={`${styles.panel} ${styles.skillsPanel}`}>
            <div className={styles.skillsContent}>
              <h2 className={styles.skillsTitle}>Tech Skills</h2>
              {skillCategories.map((category, catIndex) => (
                <div key={catIndex} className={styles.skillCategory}>
                  <h3 className={styles.skillCategoryTitle}>{category.title}</h3>
                  <div className={styles.skillsList}>
                    {category.skills.map((skill, index) => (
                      <p key={index}>/ {skill}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.scrollHint}>
              <span>Scroll to explore projects</span>
              <span className={styles.arrow}>→</span>
            </div>
          </div>

          {/* Project Panels */}
          {projects.map((project, index) => (
            <div key={project.id} className={`${styles.panel} ${styles.projectPanel}`}>
              <div className={styles.projectCard}>
                {project.url && project.url !== "#" ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.projectImageWrapper} ${hoveredProject === project.id ? styles.hovered : ''}`}
                    data-cursor="pointer"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.gradientImage}
                    />
                    {project.screenshot && (
                      <img
                        src={project.screenshot}
                        alt={`${project.title} screenshot`}
                        className={styles.screenshotImage}
                      />
                    )}
                  </a>
                ) : (
                  <div
                    className={styles.projectImageWrapper}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.gradientImage}
                    />
                    {project.screenshot && (
                      <img
                        src={project.screenshot}
                        alt={`${project.title} screenshot`}
                        className={styles.screenshotImage}
                      />
                    )}
                  </div>
                )}
                <div className={styles.projectInfo}>
                  <span className={styles.projectNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h1
                    className={styles.projectTitle}
                    {...(project.url && project.url !== "#" && {
                      onMouseEnter: () => setHoveredProject(project.id),
                      onMouseLeave: () => setHoveredProject(null)
                    })}
                  >
                    {project.url && project.url !== "#" ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h1>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.projectLinks}>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">Live Demo</a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">Source Code</a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA Panel */}
          <div className={`${styles.panel} ${styles.ctaPanel}`}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>See more on GitHub</h2>
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
