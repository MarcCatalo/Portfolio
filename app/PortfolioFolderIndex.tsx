"use client";

import Image from "next/image";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

import {
  education,
  profile,
  projects,
  skillGroups,
  stats,
  strengths,
  work,
} from "./content";
import {
  FOLDER_MOTION_MS,
  getClosedFolderState,
  getFolderAfterPress,
  getFolderTransition,
  isFolderExtended,
  shouldCloseFolderSystem,
} from "./folder-state";

type FolderId = "work" | "projects" | "skills" | "contact";

const folders: Array<{ id: FolderId; label: string; number: string }> = [
  { id: "work", label: "Work", number: "01" },
  { id: "projects", label: "Projects", number: "02" },
  { id: "skills", label: "Skills", number: "03" },
  { id: "contact", label: "Contact", number: "04" },
];

function SectionHeader({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: string;
}) {
  return (
    <header className="sheet-header">
      <div className="sheet-index">{number} / 04</div>
      <div>
        <p>{label}</p>
        <h2>{title}</h2>
      </div>
    </header>
  );
}

function WorkSheet() {
  return (
    <div className="sheet-content">
      <SectionHeader
        number="01"
        label="Professional experience"
        title="Work that ships."
      />
      <div className="experience-grid">
        {work.map((item) => (
          <article className="experience-block" key={item.role}>
            <div className="experience-heading">
              <span>{item.period}</span>
              <h3>{item.role}</h3>
              <p>{item.company}</p>
            </div>
            <ul>
              {item.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectsSheet() {
  return (
    <div className="sheet-content project-sheet-content">
      <SectionHeader
        number="02"
        label="Selected systems"
        title="Projects in use."
      />
      <div className="project-index-grid">
        {projects.map((project) => (
          <article className="project-index-card" key={project.title}>
            <div className="project-index-top">
              <div className="project-logo">
                <Image
                  src={project.logo}
                  alt={`${project.title} logo`}
                  width={54}
                  height={54}
                />
              </div>
              <div>
                <span>{project.period}</span>
                <h3>{project.title}</h3>
                <p>{project.type}</p>
              </div>
            </div>
            <p className="project-description">{project.description}</p>
            <p className="project-stack">{project.stack.join(" / ")}</p>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function SkillsSheet() {
  return (
    <div className="sheet-content">
      <SectionHeader
        number="03"
        label="Technical practice"
        title="Backend first."
      />
      <p className="skills-statement">
        Enough product range to ship across the stack, with a focus on reliable
        workflows and maintainable systems.
      </p>
      <div className="skills-index-grid">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <article className="skill-index-card" key={group.title}>
              <Icon size={20} strokeWidth={1.7} />
              <span>{group.title}</span>
              <h3>{group.skills.join(" / ")}</h3>
            </article>
          );
        })}
      </div>
      <div className="strength-index">
        <span>Professional strengths</span>
        <div>
          {strengths.map((strength, index) => (
            <p key={strength}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              {strength}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactSheet() {
  return (
    <div className="sheet-content contact-sheet-content">
      <SectionHeader
        number="04"
        label="Contact"
        title="Build something useful."
      />
      <p className="contact-statement">{profile.summary}</p>
      <div className="contact-index">
        <div className="contact-row">
          <Mail size={18} />
          <span>Email</span>
          <strong>{profile.email}</strong>
        </div>
        <div className="contact-row">
          <Phone size={18} />
          <span>Phone</span>
          <strong>{profile.phone}</strong>
        </div>
        <a
          className="contact-row contact-row-link"
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={18} />
          <span>LinkedIn</span>
          <strong>linkedin.com/in/catalomarc</strong>
          <ArrowUpRight size={16} />
        </a>
        <div className="contact-row">
          <MapPin size={18} />
          <span>Location</span>
          <strong>{profile.location}</strong>
        </div>
      </div>
      <div className="education-index">
        <span>Education / 2024</span>
        <h3>{education.school}</h3>
        <p>{education.degree}</p>
      </div>
    </div>
  );
}

const sheetByFolder: Record<FolderId, ReactNode> = {
  work: <WorkSheet />,
  projects: <ProjectsSheet />,
  skills: <SkillsSheet />,
  contact: <ContactSheet />,
};

const fullHeaderName = "MARC JOSHUA\nCATALO";

export function PortfolioFolderIndex() {
  const [activeFolder, setActiveFolder] = useState<FolderId | null>(null);
  const [displayedFolder, setDisplayedFolder] = useState<FolderId | null>(null);
  const [animateSheet, setAnimateSheet] = useState(false);
  const [typedName, setTypedName] = useState("");
  const activeIndexRef = useRef(-1);
  const sheetRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const clearSheetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const switchFolderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedName(fullHeaderName);
      return;
    }

    let characterIndex = 0;
    const typingTimer = window.setInterval(() => {
      characterIndex += 1;
      setTypedName(fullHeaderName.slice(0, characterIndex));
      if (characterIndex >= fullHeaderName.length) {
        window.clearInterval(typingTimer);
      }
    }, 72);

    return () => window.clearInterval(typingTimer);
  }, []);

  useEffect(
    () => () => {
      if (clearSheetTimerRef.current) {
        clearTimeout(clearSheetTimerRef.current);
      }
      if (switchFolderTimerRef.current) {
        clearTimeout(switchFolderTimerRef.current);
      }
    },
    [],
  );

  const usesMobileFolderLayout = () =>
    window.matchMedia("(max-width: 900px)").matches;

  const activateFolder = (nextFolder: FolderId) => {
    if (clearSheetTimerRef.current) {
      clearTimeout(clearSheetTimerRef.current);
    }
    if (switchFolderTimerRef.current) {
      clearTimeout(switchFolderTimerRef.current);
    }

    const nextIndex = folders.findIndex((folder) => folder.id === nextFolder);
    if (nextIndex !== activeIndexRef.current) {
      const transition = getFolderTransition(activeIndexRef.current, nextIndex);
      setAnimateSheet(transition.animateSheet);
      activeIndexRef.current = transition.activeIndex;
    }

    setDisplayedFolder(nextFolder);
    setActiveFolder(nextFolder);
  };

  const closeFolders = () => {
    if (clearSheetTimerRef.current) {
      clearTimeout(clearSheetTimerRef.current);
    }
    if (switchFolderTimerRef.current) {
      clearTimeout(switchFolderTimerRef.current);
    }

    const closedState = getClosedFolderState();
    activeIndexRef.current = closedState.activeIndex;
    setActiveFolder(null);
    setAnimateSheet(closedState.animateSheet);
    clearSheetTimerRef.current = setTimeout(() => {
      setDisplayedFolder(null);
    }, FOLDER_MOTION_MS);
  };

  const handleFolderPress = (pressedFolder: FolderId) => {
    if (!usesMobileFolderLayout()) {
      activateFolder(pressedFolder);
      return;
    }

    const nextFolder = getFolderAfterPress(activeFolder, pressedFolder);
    if (!nextFolder) {
      closeFolders();
      return;
    }

    if (activeFolder && activeFolder !== nextFolder) {
      if (clearSheetTimerRef.current) {
        clearTimeout(clearSheetTimerRef.current);
      }
      setActiveFolder(null);
      setAnimateSheet(false);
      switchFolderTimerRef.current = setTimeout(() => {
        activateFolder(nextFolder);
      }, FOLDER_MOTION_MS);
      return;
    }

    activateFolder(nextFolder);
  };

  const handleFolderSystemLeave = (event: ReactMouseEvent<HTMLElement>) => {
    if (usesMobileFolderLayout()) {
      return;
    }

    const relatedTarget = event.relatedTarget;
    const relatedTargetIsNode = relatedTarget instanceof Node;

    if (
      shouldCloseFolderSystem(
        Boolean(
          relatedTargetIsNode && sheetRef.current?.contains(relatedTarget),
        ),
        Boolean(
          relatedTargetIsNode && railRef.current?.contains(relatedTarget),
        ),
      )
    ) {
      closeFolders();
    }
  };

  const activeFolderIndex = activeFolder
    ? folders.findIndex((folder) => folder.id === activeFolder)
    : -1;
  const folderSheetClassName = `folder-sheet${
    displayedFolder ? ` folder-sheet-${displayedFolder}` : ""
  }${activeFolder ? " folder-sheet-open" : ""}${
    animateSheet ? " folder-sheet-animate" : ""
  }`;

  return (
    <main className="portfolio-editorial">
      <div className="editorial-rule top-rule" />
      <div className="editorial-meta">
        <span>MJC / PORTFOLIO</span>
        <span>{profile.role}</span>
        <span>{profile.location} / 2026</span>
      </div>

      <section className="editorial-hero" aria-label="Portfolio introduction">
        <div
          className={`hero-identity${activeFolder ? " hero-identity-muted" : ""}`}
        >
          <p className="hero-kicker">
            <span /> Independent portfolio / Selected work
          </p>
          <h1 aria-label={profile.name}>
            <span>{typedName.split("\n")[0]}</span>
            {typedName.includes("\n") ? (
              <>
                <br />
                <span>{typedName.split("\n")[1]}</span>
              </>
            ) : null}
            <span className="typing-cursor" aria-hidden="true" />
          </h1>
        </div>

        <div className={`hero-intro${activeFolder ? " hero-intro-muted" : ""}`}>
          <p>{profile.headline}</p>
          <span>
            Focused on clean data models, reliable workflows, and practical
            systems that help teams operate with less friction.
          </span>
          <div className="hero-actions">
            <a
              className="editorial-button editorial-button-light"
              href="/Marc%20Joshua%20Catalo%20-%20Resume.pdf"
              download
            >
              <ArrowDownToLine size={16} /> Resume
            </a>
          </div>
        </div>

        <div className="hero-footnote">
          {stats.map((stat) => (
            <span key={stat.label}>
              {stat.value}
              <br />
              <b>{stat.label}</b>
            </span>
          ))}
        </div>
      </section>

      <div
        ref={sheetRef}
        key={displayedFolder ?? "closed"}
        className={`${folderSheetClassName} desktop-folder-sheet`}
        aria-live="polite"
        onMouseLeave={handleFolderSystemLeave}
      >
        {displayedFolder ? sheetByFolder[displayedFolder] : null}
      </div>

      <div
        className={`${folderSheetClassName} mobile-folder-sheet`}
        aria-live="polite"
      >
        {displayedFolder ? sheetByFolder[displayedFolder] : null}
      </div>

      <nav
        ref={railRef}
        className="folder-rail"
        data-active-index={activeFolderIndex}
        aria-label="Portfolio folders"
        onMouseLeave={handleFolderSystemLeave}
      >
        {folders.map((folder, index) => {
          const isOpen = activeFolder === folder.id;
          const isExtended = isFolderExtended(index, activeFolderIndex);
          const isCurrent = activeFolder === folder.id;

          return (
            <div
              className={`folder-slot folder-slot-${index}${
                isExtended ? " folder-slot-extended" : ""
              }${isCurrent ? " folder-slot-current" : ""}`}
              key={folder.id}
            >
              <button
                type="button"
                className={`folder-spine${
                  isExtended ? " folder-spine-extended" : ""
                }${isCurrent ? " folder-spine-current" : ""}`}
                onMouseEnter={() => {
                  if (!usesMobileFolderLayout()) activateFolder(folder.id);
                }}
                onFocus={() => {
                  if (!usesMobileFolderLayout()) activateFolder(folder.id);
                }}
                onClick={() => handleFolderPress(folder.id)}
                aria-expanded={isOpen}
              >
                <span className="folder-number">{folder.number}</span>
                <span className="folder-label">{folder.label}</span>
              </button>
            </div>
          );
        })}
      </nav>

      <div className="editorial-hint">
        Hover a folder to open / move across to switch
      </div>
    </main>
  );
}
