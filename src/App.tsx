import { useEffect, useEffectEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type {
  CSSProperties,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import {
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
} from "./components/SocialIcons";

import {
  DOMAINS as domains,
  EVENT_DIARY as eventDiary,
  CONTACT_DIRECTORY,
  projectRailItems as projects,
} from "./data";
import type { RailItem } from "./data";

type Theme = "light" | "dark";
type AssetKind = "domain" | "project" | "event" | "logo";

const applicationUrl = "form.html";

function joinClassNames(
  ...classNames: Array<string | false | null | undefined>
) {
  return classNames.filter(Boolean).join(" ");
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  const path =
    direction === "left"
      ? "M14.5 5 7.5 12l7 7M8 12h9"
      : "m9.5 5 7 7-7 7M16 12H7";

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7 5.3 5.3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7.45" fill="currentColor" />
      <circle cx="9.2" cy="9.25" r="1.2" fill="var(--surface-solid)" />
      <circle cx="15.25" cy="14.75" r="1.35" fill="var(--surface-solid)" />
      <circle cx="15.85" cy="8.45" r="0.7" fill="var(--surface-solid)" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {open ? (
        <path
          d="m6 6 12 12M18 6 6 18"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      )}
    </svg>
  );
}

function AssetFrame({
  src,
  alt,
  label,
  kind,
  className,
}: {
  src: string;
  alt: string;
  label: string;
  kind: AssetKind;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  function handleError() {
    setFailed(true);
    setIsLoading(false);
  }

  return (
    <div
      className={joinClassNames(
        "asset-frame",
        "asset-frame--" + kind,
        !isLoading && !failed && "asset-frame--loaded",
        failed && "asset-frame--failed",
        className,
      )}
    >
      <div className="asset-skeleton" aria-hidden="true">
        <span className="asset-skeleton__piece asset-skeleton__piece--one" />
        <span className="asset-skeleton__piece asset-skeleton__piece--two" />
        <span className="asset-skeleton__sheen" />
      </div>
      <div className="asset-fallback" aria-hidden="true">
        <span className="asset-fallback__grid" />
        <span className="asset-fallback__label">{label}</span>
      </div>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={kind === "logo" ? "eager" : "lazy"}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
      )}
    </div>
  );
}

function NssSeal({
  className,
  alt = "National Service Scheme logo",
  decorative = false,
}: {
  className?: string;
  alt?: string;
  decorative?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={joinClassNames(
        "nss-seal",
        !isLoading && !failed && "nss-seal--loaded",
        failed && "nss-seal--failed",
        className,
      )}
      aria-hidden={decorative ? true : undefined}
    >
      <span className="nss-seal__glow" />
      <span className="nss-seal__skeleton" aria-hidden="true" />
      {!failed && (
        <img
          src="./public/logos/NSS-Logo.png"
          alt={decorative ? "" : alt}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setFailed(true);
            setIsLoading(false);
          }}
        />
      )}
    </span>
  );
}

function VideoFrame() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => setIsLoading(false), 8500);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  return (
    <div
      className={joinClassNames(
        "video-card__frame",
        !isLoading && "video-card__frame--loaded",
      )}
    >
      <div className="video-card__skeleton" aria-hidden="true">
        <span className="video-card__skeleton-label" />
        <span className="video-card__skeleton-caption video-card__skeleton-caption--one" />
        <span className="video-card__skeleton-caption video-card__skeleton-caption--two" />
        <span className="video-card__skeleton-track" />
        <span className="video-card__skeleton-sheen" />
      </div>
      <iframe
        src="https://player.vimeo.com/video/1106909037?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=0&muted=1"
        title="NSS SCE KIIT promotional video"
        allow="autoplay; fullscreen; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}


function LoaderPuzzle() {
  const totalColumns = 4;
  const totalRows = 3;
  const missingIndex = totalColumns + 1;

  return (
    <div className="loader-puzzle__stage" aria-hidden="true">
      <div className="loader-puzzle">
        {Array.from({ length: totalColumns * totalRows }, (_, index) => {
          const row = Math.floor(index / totalColumns);
          const column = index % totalColumns;
          const shape = (row + column) % 2 === 0 ? "a" : "b";
          const isMissing = index === missingIndex;
          const pieceDelay = (totalRows - row - 1) * 560 + column * 125;

          return (
            <span
              className={joinClassNames(
                "loader-puzzle__cell",
                isMissing && "loader-puzzle__cell--missing",
              )}
              key={index}
              style={
                {
                  "--piece-delay": String(pieceDelay) + "ms",
                  "--piece-entry-x":
                    String((column - (totalColumns - 1) / 2) * 11) + "px",
                  "--piece-entry-y": String((totalRows - row) * 22) + "px",
                  "--loader-you-delay": String(pieceDelay + 1500) + "ms",
                } as CSSProperties
              }
            >
              {isMissing ? (
                <span
                  className={joinClassNames(
                    "loader-puzzle__you",
                    "loader-puzzle__you--shape-" + shape,
                  )}
                >
                  <strong>YOU</strong>
                </span>
              ) : (
                <span
                  className={joinClassNames(
                    "loader-puzzle__piece",
                    "loader-puzzle__piece--shape-" + shape,
                  )}
                />
              )}
            </span>
          );
        })}
      </div>
      <NssSeal className="loader-puzzle__seal" decorative />
    </div>
  );
}

function LoadingScreen({
  progress,
  isLeaving,
}: {
  progress: number;
  isLeaving: boolean;
}) {
  return (
    <div
      className={joinClassNames(
        "loading-screen",
        isLeaving && "loading-screen--leaving",
      )}
      role="status"
      aria-live="polite"
      aria-label="Assembling the recruitment experience"
    >
      <div className="loading-screen__aurora" />
      <div className="loading-screen__noise" />
      <div className="loading-screen__content">
        <p className="eyebrow">National Service Scheme / SCE KIIT</p>
        <LoaderPuzzle />
        <p className="loading-screen__motto">
          <span>The National Service Scheme motto</span>
          <strong>Not Me, But You</strong>
        </p>
        <div className="loading-screen__copy">
          <span>Building a place for every strength</span>
          <strong>{String(progress).padStart(2, "0")}%</strong>
        </div>
      </div>
    </div>
  );
}

function PremiumRail({
  sectionId,
  eyebrow,
  title,
  description,
  items,
  kind,
}: {
  sectionId: string;
  eyebrow: string;
  title: string;
  description: string;
  items: RailItem[];
  kind: "domain" | "project";
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const dragRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    startScrollLeft: 0,
    didMove: false,
  });
  const suppressClickRef = useRef(false);
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoDelay = kind === "domain" ? 5600 : 6800;

  function selectSlide(
    requestedIndex: number,
    behavior: ScrollBehavior = "smooth",
  ) {
    const nextIndex = (requestedIndex + items.length) % items.length;
    activeRef.current = nextIndex;
    setActive(nextIndex);
    setCycle((currentCycle) => currentCycle + 1);

    window.requestAnimationFrame(() => {
      const rail = railRef.current;
      const card = rail?.children.item(nextIndex) as HTMLElement | null;

      if (!rail || !card) {
        return;
      }

      rail.scrollTo({
        left: Math.max(
          0,
          card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2,
        ),
        behavior,
      });
    });
  }

  const advanceRail = useEffectEvent(() => {
    if (Date.now() >= pauseUntilRef.current) {
      selectSlide(activeRef.current + 1);
    }
  });

  useEffect(() => {
    const interval = window.setInterval(() => advanceRail(), autoDelay);
    return () => window.clearInterval(interval);
  }, [autoDelay]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  function getClosestIndex(rail: HTMLDivElement) {
    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    let closestIndex = 0;
    let smallestDistance = Number.POSITIVE_INFINITY;

    Array.from(rail.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - railCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  function handleScroll() {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const rail = railRef.current;
      if (!rail) {
        return;
      }

      const closestIndex = getClosestIndex(rail);

      if (closestIndex !== activeRef.current) {
        activeRef.current = closestIndex;
        setActive(closestIndex);
        setCycle((currentCycle) => currentCycle + 1);
      }
    });
  }

  function pauseAutoAdvance(delay = 6200) {
    pauseUntilRef.current = Date.now() + delay;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      pauseAutoAdvance();
      selectSlide(activeRef.current - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      pauseAutoAdvance();
      selectSlide(activeRef.current + 1);
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const rail = railRef.current;
    if (!rail) {
      return;
    }

    pauseAutoAdvance(9600);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
      didMove: false,
    };
    rail.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    const drag = dragRef.current;

    if (!rail || drag.pointerId !== event.pointerId) {
      return;
    }

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) {
      drag.didMove = true;
    }

    rail.scrollLeft = drag.startScrollLeft - distance;
  }

  function finishPointerDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    const drag = dragRef.current;

    if (drag.pointerId !== event.pointerId) {
      return;
    }

    if (rail?.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }

    const didMove = drag.didMove;
    dragRef.current.pointerId = null;
    dragRef.current.didMove = false;
    setIsDragging(false);
    pauseAutoAdvance(didMove ? 6200 : 4400);

    if (!rail || !didMove) {
      return;
    }

    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
    selectSlide(getClosestIndex(rail));
  }

  return (
    <section
      className={joinClassNames(
        "content-section",
        "content-section--rail",
        "content-section--" + kind,
      )}
      id={sectionId}
    >
      <div className="section-copy section-copy--split">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </div>

      <div className="rail-toolbar">
        <span className="rail-toolbar__hint">
          Swipe, drag or use the arrows
        </span>
        <div className="rail-toolbar__controls">
          <button
            className="circle-button"
            type="button"
            onClick={() => {
              pauseAutoAdvance();
              selectSlide(activeRef.current - 1);
            }}
            aria-label={"Show previous " + kind}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            className="circle-button"
            type="button"
            onClick={() => {
              pauseAutoAdvance();
              selectSlide(activeRef.current + 1);
            }}
            aria-label={"Show next " + kind}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div
        className={joinClassNames(
          "premium-rail",
          isDragging && "premium-rail--dragging",
        )}
        ref={railRef}
        role="region"
        aria-label={title + " carousel"}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerDrag}
        onPointerCancel={finishPointerDrag}
        onFocus={() => pauseAutoAdvance(9600)}
      >
        {items.map((item, index) => (
          <article
            className={joinClassNames(
              "premium-card",
              active === index && "premium-card--active",
            )}
            key={item.id}
            style={{ "--card-accent": item.accent } as CSSProperties}
            onClick={() => {
              if (suppressClickRef.current) {
                return;
              }

              if (active !== index) {
                pauseAutoAdvance();
                selectSlide(index);
              }
            }}
          >
            <div className="premium-card__visual">
              <AssetFrame
                src={item.image}
                alt={item.title + " visual"}
                label={item.title}
                kind={kind === "domain" ? "domain" : "project"}
              />
            </div>
            <div className="premium-card__body">
              <p>{item.eyebrow}</p>
              <h3>{item.title}</h3>
              {item.sdgLabel && (
                <span className="premium-card__sdg-tag">
                  {item.sdgLabel}
                </span>
              )}
              <span className="premium-card__line" />
              <p className="premium-card__description">{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="rail-progress" aria-hidden="true">
        <span
          key={cycle}
          style={{ "--rail-delay": String(autoDelay) + "ms" } as CSSProperties}
        />
      </div>

      <div
        className="rail-mobile-controls"
        aria-label={title + " carousel controls"}
      >
        <button
          type="button"
          onClick={() => {
            pauseAutoAdvance();
            selectSlide(activeRef.current - 1);
          }}
        >
          <ArrowIcon direction="left" />
          <span>Previous</span>
        </button>
        <button
          type="button"
          onClick={() => {
            pauseAutoAdvance();
            selectSlide(activeRef.current + 1);
          }}
        >
          <span>Next</span>
          <ArrowIcon />
        </button>
      </div>
    </section>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoadingExiting, setIsLoadingExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = window.localStorage.getItem("nss-sce-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    if (!(document as any).startViewTransition) {
      setTheme(newTheme);
      return;
    }

    document.documentElement.classList.add("theme-transition");
    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove("theme-transition");
    });
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      return window.location.hash.replace("#", "");
    }
    return "top";
  });
  const isManualScrollRef = useRef(false);
  const manualScrollTimeoutRef = useRef<number | null>(null);
  const activeSectionRef = useRef<string>(activeSection);

  function handleNavClick(id: string) {
    isManualScrollRef.current = true;
    activeSectionRef.current = id;
    setActiveSection(id);

    const newHash = id === "top" ? "" : `#${id}`;
    const targetUrl =
      newHash || window.location.pathname + window.location.search;
    window.history.pushState(null, "", targetUrl);

    if (manualScrollTimeoutRef.current !== null) {
      window.clearTimeout(manualScrollTimeoutRef.current);
    }
    manualScrollTimeoutRef.current = window.setTimeout(() => {
      isManualScrollRef.current = false;
    }, 900);
  }

  const [eventIndex, setEventIndex] = useState(0);
  const [eventCycle, setEventCycle] = useState(0);
  const [diaryTimerCycle, setDiaryTimerCycle] = useState(0);
  const eventIndexRef = useRef(0);
  const diaryPauseUntilRef = useRef(0);
  const diaryDragRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    didMove: false,
  });
  const diaryClickSuppressedRef = useRef(false);
  const [isDiaryDragging, setIsDiaryDragging] = useState(false);
  const diaryAutoDelay = 6500;
  const selectedEvent = eventDiary[eventIndex];

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduceMotion ? 480 : 4800;
    const startedAt = window.performance.now();
    let frame = 0;
    let exitTimer = 0;

    function advance(now: number) {
      const nextProgress = Math.min(
        100,
        Math.round(((now - startedAt) / duration) * 100),
      );
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = window.requestAnimationFrame(advance);
      } else {
        setIsLoadingExiting(true);
        exitTimer = window.setTimeout(
          () => setLoading(false),
          reduceMotion ? 80 : 680,
        );
      }
    }

    frame = window.requestAnimationFrame(advance);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("nss-sce-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (loading) return;

    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      const targetEl = document.getElementById(hashId);
      if (targetEl) {
        window.setTimeout(() => {
          targetEl.scrollIntoView({ behavior: "smooth" });
          setActiveSection(hashId);
          activeSectionRef.current = hashId;
        }, 120);
      }
    }

    const sectionIds = [
      "top",
      "story",
      "domains",
      "projects",
      "diary",
      "connect",
    ];

    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const offsetMargin = 180;
      const scrollY = window.scrollY;
      const windowBottom = scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      let currentSection = "top";

      if (documentHeight - windowBottom < 80) {
        currentSection = "connect";
      } else {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop - offsetMargin;
            if (scrollY >= top) {
              currentSection = id;
              break;
            }
          }
        }
      }

      if (currentSection !== activeSectionRef.current) {
        activeSectionRef.current = currentSection;
        setActiveSection(currentSection);

        const newHash = currentSection === "top" ? "" : `#${currentSection}`;
        const currentHash = window.location.hash;

        if (currentHash !== newHash) {
          const targetUrl =
            newHash || window.location.pathname + window.location.search;
          window.history.replaceState(null, "", targetUrl);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const advanceDiary = useEffectEvent(() => {
    if (Date.now() < diaryPauseUntilRef.current) {
      return;
    }

    const nextIndex = (eventIndexRef.current + 1) % eventDiary.length;
    eventIndexRef.current = nextIndex;
    setEventIndex(nextIndex);
    setEventCycle((currentCycle) => currentCycle + 1);
    setDiaryTimerCycle((currentCycle) => currentCycle + 1);
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => advanceDiary(), diaryAutoDelay);
    return () => window.clearInterval(interval);
  }, [diaryAutoDelay]);

  function pauseDiaryAutoAdvance(delay = diaryAutoDelay) {
    diaryPauseUntilRef.current = Date.now() + delay;
    setDiaryTimerCycle((currentCycle) => currentCycle + 1);
  }

  function selectDiaryEvent(requestedIndex: number) {
    const nextIndex = (requestedIndex + eventDiary.length) % eventDiary.length;
    diaryPauseUntilRef.current = Date.now() + diaryAutoDelay + 1800;
    eventIndexRef.current = nextIndex;
    setEventIndex(nextIndex);
    setEventCycle((currentCycle) => currentCycle + 1);
    setDiaryTimerCycle((currentCycle) => currentCycle + 1);
  }

  function moveDiary(direction: number) {
    pauseDiaryAutoAdvance();
    selectDiaryEvent(eventIndexRef.current + direction);
  }

  function handleDiaryPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pauseDiaryAutoAdvance(9600);
    diaryDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      didMove: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDiaryDragging(true);
  }

  function handleDiaryPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = diaryDragRef.current;
    if (drag.pointerId !== event.pointerId) {
      return;
    }

    if (Math.abs(event.clientX - drag.startX) > 18) {
      drag.didMove = true;
    }
  }

  function finishDiaryDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = diaryDragRef.current;
    if (drag.pointerId !== event.pointerId) {
      return;
    }

    const didMove = drag.didMove;
    const direction = event.clientX < drag.startX ? 1 : -1;
    drag.pointerId = null;
    drag.didMove = false;
    setIsDiaryDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!didMove) {
      pauseDiaryAutoAdvance(4400);
      return;
    }

    diaryClickSuppressedRef.current = true;
    window.setTimeout(() => {
      diaryClickSuppressedRef.current = false;
    }, 0);
    selectDiaryEvent(eventIndexRef.current + direction);
  }

  function handleDiaryKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveDiary(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveDiary(1);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="h-full m-0 mt-0 p-0 pt-0">
      <div className="site-shell h-full" data-theme={theme}>
        <div className="ambient-puzzle" aria-hidden="true"></div>
        <div className="grain" aria-hidden="true" />

        <header className="site-header">
          <a
            className="brand"
            href="#top"
            aria-label="NSS SCE KIIT home"
            onClick={() => handleNavClick("top")}
          >
            <NssSeal className="brand__mark" alt="NSS SCE KIIT logo" />
            <span className="brand__divider" aria-hidden="true" />
            <img
              className="brand__kiit"
              src="./public/logos/KIIT-Logo.png"
              alt="Kalinga Institute of Industrial Technology"
            />
            <span className="brand__divider" aria-hidden="true" />
            <span className="brand__copy">
              <strong>NSS SCE</strong>
              <span>KIIT</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a
              href="#story"
              className={activeSection === "story" ? "nav-link--active" : ""}
              aria-current={activeSection === "story" ? "page" : undefined}
              onClick={() => handleNavClick("story")}
            >
              The Story
            </a>
            <a
              href="#domains"
              className={activeSection === "domains" ? "nav-link--active" : ""}
              aria-current={activeSection === "domains" ? "page" : undefined}
              onClick={() => handleNavClick("domains")}
            >
              Domains
            </a>
            <a
              href="#projects"
              className={activeSection === "projects" ? "nav-link--active" : ""}
              aria-current={activeSection === "projects" ? "page" : undefined}
              onClick={() => handleNavClick("projects")}
            >
              Projects
            </a>
            <a
              href="#diary"
              className={activeSection === "diary" ? "nav-link--active" : ""}
              aria-current={activeSection === "diary" ? "page" : undefined}
              onClick={() => handleNavClick("diary")}
            >
              Impact
            </a>
            <a
              href="#connect"
              className={activeSection === "connect" ? "nav-link--active" : ""}
              aria-current={activeSection === "connect" ? "page" : undefined}
              onClick={() => handleNavClick("connect")}
            >
              Connect
            </a>
          </nav>

          <div className="header-actions">
            <button
              className="theme-switch"
              type="button"
              onClick={toggleTheme}
              aria-label={
                "Switch to " + (theme === "dark" ? "light" : "dark") + " theme"
              }
            >
              <span className="theme-switch__icon">
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </span>
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
            <a
              className="button button--nss-site"
              href="https://nss.kiit.ac.in/"
              target="_blank"
              rel="noreferrer"
            >
              NSS KIIT
              <ArrowIcon />
            </a>
            <a
              className="button button--header rounded-lg"
              href={applicationUrl}
              target="_blank"
              rel="noreferrer"
            >
              Apply now
              <ArrowIcon />
            </a>
            <button
              className="menu-button"
              type="button"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </header>

        <div
          className={joinClassNames(
            "mobile-menu",
            menuOpen && "mobile-menu--open",
          )}
        >
          <nav aria-label="Mobile navigation">
            <a
              href="#story"
              className={activeSection === "story" ? "nav-link--active" : ""}
              aria-current={activeSection === "story" ? "page" : undefined}
              onClick={() => {
                closeMenu();
                handleNavClick("story");
              }}
            >
              The story
            </a>
            <a
              href="#domains"
              className={activeSection === "domains" ? "nav-link--active" : ""}
              aria-current={activeSection === "domains" ? "page" : undefined}
              onClick={() => {
                closeMenu();
                handleNavClick("domains");
              }}
            >
              Domains
            </a>
            <a
              href="#projects"
              className={activeSection === "projects" ? "nav-link--active" : ""}
              aria-current={activeSection === "projects" ? "page" : undefined}
              onClick={() => {
                closeMenu();
                handleNavClick("projects");
              }}
            >
              Projects
            </a>
            <a
              href="#diary"
              className={activeSection === "diary" ? "nav-link--active" : ""}
              aria-current={activeSection === "diary" ? "page" : undefined}
              onClick={() => {
                closeMenu();
                handleNavClick("diary");
              }}
            >
              Impact diary
            </a>
            <a
              href="#connect"
              className={activeSection === "connect" ? "nav-link--active" : ""}
              aria-current={activeSection === "connect" ? "page" : undefined}
              onClick={() => {
                closeMenu();
                handleNavClick("connect");
              }}
            >
              Connect
            </a>
            <a
              href="https://nss.kiit.ac.in/"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              NSS KIIT website
            </a>
            <a
              href={applicationUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Apply now
            </a>
          </nav>
          <p>Every contribution matters.</p>
        </div>

        <main>
          <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="hero__content">
              <div className="hero__intro">
                <p className="eyebrow eyebrow--hero">
                  <span className="eyebrow__dot" />
                  Recruitment 2026 / NSS SCE KIIT
                </p>
                <h1 id="hero-title">
                  <span>The picture is</span>
                  <em>almost complete.</em>
                </h1>
                <p className="hero__lede">
                  Every volunteer is unique. Every skill has a place. Every
                  contribution matters.
                  <br />
                  <br />
                  The puzzle is almost complete. The only missing piece is{" "}
                  <strong>you.</strong>
                </p>
                <div className="hero__actions">
                  <a
                    className="button button--primary"
                    href={applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Be the missing piece
                    <ArrowIcon />
                  </a>
                  <a
                    className="text-link"
                    href="#story"
                    onClick={() => handleNavClick("story")}
                  >
                    See why you matter
                    <span />
                  </a>
                </div>
              </div>

              <div
                className="hero__visual"
                aria-label="An abstract puzzle with one piece labelled you"
              >
                <div className="hero-puzzle">
                  <div className="hero-puzzle__piece hero-puzzle__piece--a" />
                  <div className="hero-puzzle__piece hero-puzzle__piece--b" />
                  <div className="hero-puzzle__piece hero-puzzle__piece--c" />
                  <div className="hero-puzzle__piece hero-puzzle__piece--d" />
                  <div className="hero-puzzle__piece hero-puzzle__piece--e" />
                  <div className="hero-puzzle__piece hero-puzzle__piece--f" />
                  <div className="hero-puzzle__piece hero-puzzle__piece--g" />
                  <div className="hero-puzzle__piece hero-puzzle__piece--h" />
                  <div className="hero-puzzle__missing">
                    <strong>YOU</strong>
                  </div>
                </div>
                <div className="hero__stamp">
                  <span>NSS Motto</span>
                  <strong>
                    Not Me,
                    <br />
                    But You
                  </strong>
                </div>
              </div>
            </div>

            <div className="hero__footer">
              <p>Scroll to find where your piece fits</p>
              <span className="hero__scroll-line" />
              <div className="hero__facts">
                <span>Made of many strengths</span>
              </div>
            </div>
          </section>

          <section className="content-section story-brief" id="story">
            <div className="story-brief__intro">
              <p className="eyebrow">The applicant is the answer</p>
              <h2>
                We are not simply asking you to join. We are showing you where
                NSS needs you.
              </h2>
            </div>
            <div className="story-brief__grid">
              <article className="story-brief__card">
                <span>A unique shape</span>
                <h3>Every individual carries something distinct.</h3>
                <p>
                  Every volunteer brings a different set of skills, ideas, and
                  efforts. Like a puzzle piece, every person has a shape and
                  purpose that cannot be replaced.
                </p>
              </article>
              <article className="story-brief__card story-brief__card--accent">
                <span>The missing piece</span>
                <h3>You are not another addition to NSS.</h3>
                <p>
                  You are the missing piece that helps complete it. From your
                  very first step, your contribution is important and valued.
                </p>
              </article>
              <article className="story-brief__card">
                <span>The whole picture</span>
                <h3>When every strength meets, the picture becomes whole.</h3>
                <p>
                  Existing volunteers, seniors, coordinators, and new recruits
                  come together to build an organisation shaped by everyone who
                  chooses to be part of it.
                </p>
              </article>
            </div>
          </section>

          <section className="content-section video-section">
            <div className="video-section__copy">
              <p className="eyebrow">See the picture move</p>
              <h2>Service has a rhythm.</h2>
              <p>
                The work is hands-on, people-first, and always bigger than a
                single person.
              </p>
              <a
                className="text-link"
                href="#diary"
                onClick={() => handleNavClick("diary")}
              >
                Explore the event diary
                <span />
              </a>
            </div>
            <div className="video-card">
              <div className="video-card__topbar">
                <span>Field reel / NSS SCE KIIT</span>
                <span className="video-card__live">
                  <i /> Ready
                </span>
              </div>
              <VideoFrame />
              <div className="video-card__footer">
                <span>Not Me, But You</span>
              </div>
            </div>
          </section>

          <PremiumRail
            sectionId="domains"
            eyebrow="Where your strength fits"
            title="Five ways to make a mark."
            description="Find the contribution space that feels most like you. These are independent, tactile rails: take your time, swipe through, and discover the work behind each one."
            items={domains}
            kind="domain"
          />

          <section className="content-section manifesto-section">
            <div className="manifesto-section__quote">
              <span className="manifesto-section__mark">"</span>
              <p>
                The organisation is not built by a few individuals. It is built
                by everyone who chooses to be a part of it.
              </p>
              <span className="manifesto-section__mark manifesto-section__mark--end">
                "
              </span>
            </div>
            <div className="manifesto-section__pieces">
              <div>
                <h3>Every volunteer is unique.</h3>
              </div>
              <div>
                <h3>Every skill has a place.</h3>
              </div>
              <div>
                <h3>Every contribution matters.</h3>
              </div>
            </div>
          </section>

          <PremiumRail
            sectionId="projects"
            eyebrow="The wider picture"
            title="Projects with room for your piece."
            description="Every project is a different edge of the NSS SCE KIIT puzzle. Together, they turn individual effort into an enduring picture of service."
            items={projects}
            kind="project"
          />

          <section className="content-section diary-section" id="diary">
            <div className="section-copy section-copy--split">
              <div>
                <p className="eyebrow">Event diary</p>
                <h2>Moments that became more than moments.</h2>
              </div>
              <p>
                From health support to awareness drives, every field note tells
                the story of students choosing action over apathy.
              </p>
            </div>

            <div
              className={joinClassNames(
                "diary-window",
                isDiaryDragging && "diary-window--dragging",
              )}
              style={
                { "--event-accent": selectedEvent.accent } as CSSProperties
              }
              role="region"
              aria-label="Automated NSS event diary"
              tabIndex={0}
              onKeyDown={handleDiaryKeyDown}
              onPointerEnter={() => pauseDiaryAutoAdvance()}
              onPointerDown={handleDiaryPointerDown}
              onPointerMove={handleDiaryPointerMove}
              onPointerUp={finishDiaryDrag}
              onPointerCancel={finishDiaryDrag}
              onLostPointerCapture={finishDiaryDrag}
              onFocusCapture={() => pauseDiaryAutoAdvance()}
            >
              <div
                className="diary-window__visual"
                key={"visual-" + selectedEvent.id + "-" + eventCycle}
              >
                <AssetFrame
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  label={selectedEvent.title}
                  kind="event"
                />
                <div className="diary-window__tag">NSS field note</div>
              </div>
              <div
                className="diary-window__content"
                key={"content-" + selectedEvent.id + "-" + eventCycle}
              >
                <p className="eyebrow">Event archive</p>
                <h3>{selectedEvent.title}</h3>
                <div className="diary-window__meta">
                  <span>{selectedEvent.date}</span>
                  <span>{selectedEvent.location}</span>
                </div>
                <p>{selectedEvent.description}</p>
                <div className="diary-window__controls">
                  <button
                    className="circle-button"
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onPointerUp={(event) => event.stopPropagation()}
                    onPointerCancel={(event) => event.stopPropagation()}
                    onClick={() => moveDiary(-1)}
                    aria-label="Show previous event"
                  >
                    <ArrowIcon direction="left" />
                  </button>
                  <button
                    className="circle-button"
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onPointerUp={(event) => event.stopPropagation()}
                    onPointerCancel={(event) => event.stopPropagation()}
                    onClick={() => moveDiary(1)}
                    aria-label="Show next event"
                  >
                    <ArrowIcon />
                  </button>
                </div>
              </div>
              <div className="diary-window__autoplay" aria-hidden="true">
                <span
                  key={diaryTimerCycle}
                  style={
                    {
                      "--diary-delay": String(diaryAutoDelay) + "ms",
                    } as CSSProperties
                  }
                />
              </div>
            </div>

            <div
              className="diary-tabs"
              role="tablist"
              aria-label="Choose an event"
            >
              {eventDiary.map((event, index) => (
                <button
                  className={joinClassNames(
                    "diary-tab",
                    eventIndex === index && "diary-tab--active",
                  )}
                  key={event.id}
                  type="button"
                  role="tab"
                  aria-selected={eventIndex === index}
                  onClick={() => {
                    if (!diaryClickSuppressedRef.current) {
                      selectDiaryEvent(index);
                    }
                  }}
                >
                  {event.title}
                </button>
              ))}
            </div>
          </section>

          <section className="content-section connect-section" id="connect">
            <div className="connect-section__top">
              <div>
                <p className="eyebrow">Your piece is waiting</p>
                <h2>Ready to complete the picture?</h2>
              </div>
              <a
                className="button button--primary rounded-lg"
                href={applicationUrl}
                target="_blank"
                rel="noreferrer"
              >
                Apply for recruitment
                <ArrowIcon />
              </a>
            </div>

            <div className="connect-section__grid">
              <article className="connect-card connect-card--about">
                <h3>Stay close to the work.</h3>
                <p>
                  Connect with NSS SCE KIIT to stay updated with activities,
                  events, and community service initiatives.
                </p>
                <a
                  href="https://nss.kiit.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  NSS KIIT home page
                  <span />
                </a>
              </article>
              <article className="connect-card">
                <p className="connect-card__label">Follow the unit</p>
                <a
                  href="https://www.instagram.com/nss.sce.kiit/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="connect-card__link connect-card__link--instagram"
                >
                  <span className="connect-card__link-label">
                    <RiInstagramFill className="social-icon social-icon--instagram" />
                    <span>Instagram</span>
                  </span>
                  <ArrowIcon />
                </a>
                <a
                  href="https://www.youtube.com/c/NSSSCE"
                  target="_blank"
                  rel="noreferrer"
                  className="connect-card__link connect-card__link--youtube"
                >
                  <span className="connect-card__link-label">
                    <RiYoutubeFill className="social-icon social-icon--youtube" />
                    <span>YouTube</span>
                  </span>
                  <ArrowIcon />
                </a>
                <a
                  href="https://www.linkedin.com/company/nss-sce-kiit/"
                  target="_blank"
                  rel="noreferrer"
                  className="connect-card__link connect-card__link--linkedin"
                >
                  <span className="connect-card__link-label">
                    <RiLinkedinBoxFill className="social-icon social-icon--linkedin" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowIcon />
                </a>
              </article>
            </div>
          </section>
          <section className="contact-directory">
            <article className="contact-directory__card">
              <div className="contact-directory__header">
                <p className="contact-directory__eyebrow">Need assistance?</p>
                <h3>Contact the Recruitment Team</h3>
                <p>
                  Reach out to any of the coordinators below for recruitment,
                  volunteering, or event-related queries.
                </p>
              </div>

              <div className="contact-directory__grid">
                {CONTACT_DIRECTORY.map((person) => (
                  <a
                    key={person.name}
                    href={`tel:${person.phone.replace(/\s+/g, "")}`}
                    className="contact-person"
                  >
                    <strong>{person.name}</strong>
                    <span>{person.phone}</span>
                  </a>
                ))}
              </div>
            </article>
          </section>
        </main>

        <footer className="site-footer">
          <p>© 2026 NSS SCE KIIT</p>
          <p>National Service Scheme / School of Computer Engineering</p>
          <a href="#top" onClick={() => handleNavClick("top")}>
            Back to top <ArrowIcon />
          </a>
        </footer>
      </div>

      {loading && (
        <LoadingScreen progress={progress} isLeaving={isLoadingExiting} />
      )}
    </div>
  );
}

export default App;
