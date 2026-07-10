"use client"

import { useEffect, useState } from "react";
import ParallaxImage from "./components/ParallaxImage";
import ParallaxVideo from "./components/ParallaxVideo";
import HorizontalScroll from "./components/HorizontalScroll";
import { LenisProvider } from "./context/LenisContext";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      const isClickable =
        target.closest('a, button, [onclick], .scroll-indicator, .footer-links h1') !== null;
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setCursorPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionClass) => {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const scrollToNextSection = () => {
    scrollToSection('projects');
  };

  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    const checkTouchDevice = () => {
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

    const isTouch = checkTouchDevice();
    cursor.style.display = isTouch ? "none" : "block";

    const handleResize = () => {
      const touch = checkTouchDevice();
      cursor.style.display = touch ? "none" : "block";
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <LenisProvider>
      <div
        className="custom-cursor"
        style={{
          position: 'fixed',
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          borderRadius: '50%',
          border: '2px solid white',
          backgroundColor: 'white',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'width 0.3s ease, height 0.3s ease'
        }}
      />

      <div className="app" style={{ cursor: 'auto' }}>
        <section className="hero">
          <div className="title">
            <h1>José Mario Hernández</h1>
            <p className="role">Fullstack creative developer</p>
            <p className="location">based in Tenerife, Canary Islands.</p>
          </div>

          <div className="nav">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>PROJECTS</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>PROFILE</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('banner'); }}>CONTACT</a>
          </div>

          <div className="scroll-indicator" onClick={scrollToNextSection} style={{ cursor: 'pointer' }}>
            <p style={{ pointerEvents: 'none' }}>SCROLL</p>
            <svg className="scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ pointerEvents: 'none' }}>
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </section>

        <HorizontalScroll />

        <section className="about">
          <div className="col intro">
            <p>Who am I?</p>
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
          </div>
          <div className="col portrait">
            <div className="portrait-container">
              <div className="img">
                <ParallaxVideo src="/videos/fuzzy.mp4" poster="/videos/fuzzy-poster.jpg" />
              </div>
            </div>
          </div>
        </section>

        <section className="banner">
          <div className="img">
            <ParallaxImage src="/portraits/gradient2.jpg" alt="" />
          </div>

          <div className="banner-copy">
            <p>GET IN TOUCH WITH ME!</p>
            <p className="subtitle">I&apos;m always open to collaborating on new projects.</p>
            <div className="buttons">
              <a href="https://www.linkedin.com/in/mariohrdezc" target="_blank" rel="noopener noreferrer">
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

        <section className="footer">
          <div className="col">
            <p><a href="https://instagram.com/mariocoding" target="_blank" rel="noopener noreferrer">Instagram</a> / <a href="https://github.com/mariomhz" target="_blank" rel="noopener noreferrer">Github</a> / <a href="https://www.linkedin.com/in/josemariohernandez/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            <div className="footer-links">
              <h1 onClick={() => scrollToSection('projects')} style={{ cursor: 'none' }}>Projects</h1>
              <h1 onClick={() => scrollToSection('about')} style={{ cursor: 'none' }}>About</h1>
              <h1 onClick={() => scrollToSection('banner')} style={{ cursor: 'none' }}>Contact</h1>
              <h1 onClick={scrollToTop} style={{ cursor: 'none' }}>Back to top</h1>
            </div>
            <div className="credits">
              <p>&copy; developed and designed by Mario Hernandez</p>
              <p className="credit">All 3D art in the current website was created by me.</p>
            </div>
          </div>
        </section>
      </div>
    </LenisProvider>
  );
}
