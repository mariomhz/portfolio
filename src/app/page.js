"use client"

import { useEffect, useRef } from "react";
import ParallaxImage from "./components/ParallaxImage";
import ParallaxVideo from "./components/ParallaxVideo";
import HorizontalScroll from "./components/HorizontalScroll";
import { LenisProvider } from "./context/LenisContext";

const isTouchDevice = () => {
  try {
    return (
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0)
    );
  } catch {
    return false;
  }
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Home() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || isTouchDevice()) return;

    const reduced = prefersReducedMotion();
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let hovering = false;
    let rafId = null;

    const onPointerMove = (e) => {
      if (cursor.style.opacity !== "1") {
        current.x = e.clientX;
        current.y = e.clientY;
        cursor.style.opacity = "1";
      }

      target.x = e.clientX;
      target.y = e.clientY;

      const overClickable =
        e.target instanceof Element &&
        e.target.closest("a, button, [role='button']") !== null;

      if (overClickable !== hovering) {
        hovering = overClickable;
        cursor.style.width = hovering ? "60px" : "40px";
        cursor.style.height = hovering ? "60px" : "40px";
      }
    };

    const render = () => {
      const ease = reduced ? 1 : 0.1;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      cursor.style.transform =
        "translate3d(" + current.x + "px," + current.y + "px,0) translate(-50%,-50%)";
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToId = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
  };

  const handleAnchor = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <LenisProvider>
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>

      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />

      <div className="app">
        <header id="hero" className="hero">
          <div className="title">
            <h1>José Mario Hernández</h1>
            <p className="role">Fullstack developer</p>
            <p className="location">
              Tenerife, Canary Islands ·{" "}
              <span className="languages-count">8 languages</span>
              <span className="sr-only">
                : Portuguese, Spanish and Italian natively, English, Catalan,
                French, American Sign Language and Norwegian
              </span>
            </p>
          </div>

          <nav className="nav" aria-label="Primary">
            <a href="#projects" onClick={handleAnchor("projects")}>PROJECTS</a>
            <a href="#about" onClick={handleAnchor("about")}>PROFILE</a>
            <a href="#contact" onClick={handleAnchor("contact")}>CONTACT</a>
          </nav>

          <button
            type="button"
            className="scroll-indicator"
            onClick={() => scrollToId("projects")}
          >
            <span aria-hidden="true">SCROLL</span>
            <span className="sr-only">Scroll to projects</span>
            <svg
              className="scroll-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
        </header>

        <main>
          <HorizontalScroll />

          <section id="about" className="about" aria-labelledby="about-heading">
            <div className="col intro">
              <h2 id="about-heading" className="section-label">Who am I?</h2>
              <blockquote className="creed">
                &ldquo;To create is to bring something into existence that wasn&rsquo;t there before.&rdquo;
                <cite>Rick Rubin, The Creative Act</cite>
              </blockquote>
              <p>
                I believe technology is the tool I was given to create and I use it to shape digital experiences.
              </p>
              <p>
                I want to create work that is accessible, unique. I want to make websites more useful, more beautiful, more fun. I want to work with people, not for people, because I believe when humans think and work together we can achieve some pretty incredible stuff.
              </p>
              <p>
                I speak Portuguese, Spanish, English, Italian, Catalan, French, Norwegian, and American Sign Language, which shapes how I think about breaking communication barriers, human and digital.
              </p>
              <p>
                I trained as Técnico Superior en Desarrollo de Aplicaciones Web, I run Linux on my daily machines, and I work out of the terminal, Git and Docker.
              </p>
            </div>
            <div className="col portrait">
              <div className="portrait-container">
                <div className="img">
                  <ParallaxVideo
                    sources={[
                      { src: "/videos/fuzzy-av1.mp4", type: "video/mp4; codecs=av01.0.05M.08" },
                      { src: "/videos/fuzzy.mp4", type: "video/mp4" },
                    ]}
                    poster="/videos/fuzzy-poster.webp"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="banner" aria-labelledby="contact-heading">
            <div className="img">
              <ParallaxImage
                src="/portraits/gradient2.webp"
                alt=""
                width={1300}
                height={975}
              />
            </div>

            <div className="banner-copy">
              <h2 id="contact-heading">GET IN TOUCH WITH ME!</h2>
              <p className="subtitle">
                Open to junior developer and technical support roles, and always up for collaborating on new projects.
              </p>
              <div className="buttons">
                <a href="https://www.linkedin.com/in/mariohrdezc/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="mailto:mariohrdezdeveloper@gmail.com">
                  Email Me
                </a>
                <a href="https://github.com/mariomhz" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="/mario-hernandez-cv.pdf" download="Mario Hernandez CV.pdf">
                  Download CV
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="col">
            <p>
              <a href="https://instagram.com/mariocoding" target="_blank" rel="noopener noreferrer">Instagram</a>
              {" / "}
              <a href="https://github.com/mariomhz" target="_blank" rel="noopener noreferrer">Github</a>
              {" / "}
              <a href="https://www.linkedin.com/in/mariohrdezc/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
            <nav className="footer-links" aria-label="Footer">
              <button type="button" onClick={() => scrollToId("projects")}>Projects</button>
              <button type="button" onClick={() => scrollToId("about")}>About</button>
              <button type="button" onClick={() => scrollToId("contact")}>Contact</button>
              <button type="button" onClick={scrollToTop}>Back to top</button>
            </nav>
            <div className="credits">
              <p>&copy; developed and designed by Mario Hernandez</p>
              <p className="credit">3D art created by me.</p>
            </div>
          </div>
        </footer>
      </div>
    </LenisProvider>
  );
}
