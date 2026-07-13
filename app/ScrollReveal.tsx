"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-title, .hero-copy, .terminal-card, .experience-row, .project-card, .skills-intro, .skill-card, .education, .contact-list a, footer",
      ),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    );

    targets.forEach((target) => {
      target.classList.add("reveal-up");
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
