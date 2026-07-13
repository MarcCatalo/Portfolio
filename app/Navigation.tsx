"use client";

import { useEffect, useState } from "react";

type NavigationProps = {
  items: string[];
};

export function Navigation({ items }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sectionIds = ["top", ...items.map((item) => item.toLowerCase())];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    let frame = 0;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.38;
      const current = sections.reduce((active, section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= marker) {
          return section.id;
        }

        return active;
      }, "top");

      setActiveSection(current);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <header className="site-header">
      <nav aria-label="Primary navigation">
        {items.map((item) => {
          const id = item.toLowerCase();
          return (
            <a
              key={item}
              className={activeSection === id ? "active" : undefined}
              href={`#${id}`}
            >
              {item}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
