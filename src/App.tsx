import { useEffect, useEffectEvent, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react'

type Theme = 'light' | 'dark'
type AssetKind = 'domain' | 'project' | 'event' | 'logo'

type RailItem = {
  id: string
  title: string
  eyebrow: string
  description: string
  image: string
  accent: string
}

type EventItem = {
  id: string
  title: string
  date: string
  location: string
  description: string
  image: string
  accent: string
}

const applicationUrl = 'form.html'

const domains: RailItem[] = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    eyebrow: 'Story in motion',
    description:
      'Shape raw footage into compelling stories through precise cuts, transitions, effects, and a strong visual eye.',
    image: '/videoeditor.jpg',
    accent: '#f2633e',
  },
  {
    id: 'graphic-designing',
    title: 'Graphic Designing',
    eyebrow: 'Ideas, made visible',
    description:
      'Bring ideas to life through visual storytelling, design principles, and compelling work for digital media.',
    image: '/gd2.jpg',
    accent: '#e0b833',
  },
  {
    id: 'photography',
    title: 'Photography',
    eyebrow: 'Moments, held close',
    description:
      'Capture events, emotions, and perspectives with technical skill, creativity, and visual impact.',
    image: '/camera.jpg',
    accent: '#4a8b78',
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    eyebrow: 'Words with purpose',
    description:
      'Craft engaging, impactful writing that combines creativity, clarity, and strategy for diverse audiences.',
    image: '/contentwriter.jpg',
    accent: '#4277b9',
  },
  {
    id: 'general-volunteering',
    title: 'General Volunteering',
    eyebrow: 'Service in action',
    description:
      'Build social responsibility and leadership through hands-on service, guided by the motto Not Me But You.',
    image: '/gv.jpg',
    accent: '#8c5bb0',
  },
]

const projects: RailItem[] = [
  {
    id: 'bandhutva',
    title: 'Bandhutva',
    eyebrow: 'NSS SCE project',
    description: 'One of the many distinctive projects that make up the NSS SCE KIIT story.',
    image: '/bandhutva.png',
    accent: '#c91a35',
  },
  {
    id: 'dhara',
    title: 'Dhara',
    eyebrow: 'NSS SCE project',
    description: 'A distinctive part of the shared work, energy, and service within NSS SCE KIIT.',
    image: '/dhara.png',
    accent: '#078a3d',
  },
  {
    id: 'nidaan',
    title: 'Nidaan',
    eyebrow: 'NSS SCE project',
    description: 'A chapter in the unit’s work that is made stronger by every volunteer who joins it.',
    image: '/nidaan.png',
    accent: '#cd8b29',
  },
  {
    id: 'riddhi',
    title: 'Riddhi',
    eyebrow: 'NSS SCE project',
    description: 'A piece of the larger picture of community, initiative, and shared contribution.',
    image: '/riddhi.png',
    accent: '#f47721',
  },
  {
    id: 'sanyukt',
    title: 'Sanyukt',
    eyebrow: 'NSS SCE project',
    description: 'A project identity within the collective energy that keeps the unit moving forward.',
    image: '/sanyukt.png',
    accent: '#f6a31a',
  },
  {
    id: 'sparsh',
    title: 'Sparsh',
    eyebrow: 'NSS SCE project',
    description: 'A distinct project within the whole, made meaningful by people who choose to contribute.',
    image: '/sparsh.png',
    accent: '#d7a01d',
  },
  {
    id: 'swet',
    title: 'Swet',
    eyebrow: 'NSS SCE project',
    description: 'A project piece in the larger NSS SCE KIIT picture of hands-on service.',
    image: '/swet.png',
    accent: '#0b6098',
  },
  {
    id: 'udaan',
    title: 'Udaan',
    eyebrow: 'NSS SCE project',
    description: 'A distinct part of the work that comes alive when individual strengths meet a shared purpose.',
    image: '/udaan.png',
    accent: '#dd0c86',
  },
  {
    id: 'urja',
    title: 'Urja',
    eyebrow: 'NSS SCE project',
    description: 'An identity within the NSS SCE KIIT project ecosystem, powered by collective effort.',
    image: '/urja.png',
    accent: '#079fce',
  },
]

const eventDiary: EventItem[] = [
  {
    id: 'health-camp',
    title: 'Health Camp',
    date: 'March 2025',
    location: 'Damana High School',
    description:
      'NSS SCE organized an ENT health camp with free check-ups, consultations, and guidance to encourage healthy practices and early detection.',
    image: '/health camp.jpg',
    accent: '#e46e51',
  },
  {
    id: 'orphanage-visit',
    title: 'Orphanage Visit',
    date: 'March 2025',
    location: 'Madhurmaye Orphanage',
    description:
      'Volunteers shared meaningful moments with children through interactive sessions on good habits, hygiene practices, and moral values.',
    image: '/orphange.jpg',
    accent: '#6c79bc',
  },
  {
    id: 'plantation-drive',
    title: 'Plantation Drive',
    date: 'July 2025',
    location: 'Prasanti Vihar',
    description:
      'Saplings were planted in public spaces and educational institutions to encourage greener practices and environmental responsibility.',
    image: '/plantation.jpeg',
    accent: '#47886d',
  },
  {
    id: 'cleanliness-drive',
    title: 'Cleanliness Drive',
    date: 'September 2024',
    location: 'KIIT Road',
    description:
      'Volunteers cleaned public areas, spoke about waste management, and encouraged the community to maintain a clean, healthy environment.',
    image: '/cleandrive.jpg',
    accent: '#d59345',
  },
  {
    id: 'road-safety',
    title: 'Road Safety Rally',
    date: 'January 2025',
    location: 'KIIT Road',
    description:
      'A public rally used posters, slogans, and conversations to reinforce responsible driving, helmets, seatbelts, and traffic safety.',
    image: '/roadsafety.JPG',
    accent: '#c85f50',
  },
  {
    id: 'animal-feeding',
    title: 'Animal Feeding',
    date: 'November 2024',
    location: 'KIIT Road',
    description:
      'The unit provided food and clean water to stray animals, promoting empathy, care, and humane treatment for voiceless beings.',
    image: '/animalfeeding.jpg',
    accent: '#8f6a4a',
  },
  {
    id: 'special-camp',
    title: 'Special Camp',
    date: 'March 2024',
    location: 'Village',
    description:
      'A community-focused camp brought together cleanliness drives, awareness rallies, health check-ups, and educational sessions.',
    image: '/specialcamp.jpg',
    accent: '#9164ab',
  },
  {
    id: 'daan',
    title: 'DAAN',
    date: 'November 2024',
    location: 'Slum',
    description:
      'Essentials including clothes, food items, and stationery were collected and distributed to support underprivileged communities.',
    image: '/daan.jpg',
    accent: '#bf7852',
  },
  {
    id: 'slum-visit',
    title: 'Slum Visit',
    date: 'March 2025',
    location: 'Local Slum',
    description:
      'Volunteers held awareness sessions around hygiene, education, and health while listening to residents and distributing essentials.',
    image: '/slumvisit.jpg',
    accent: '#497b92',
  },
  {
    id: 'school-visit',
    title: 'School Visit',
    date: 'December 2025',
    location: 'Damana High School',
    description:
      'Interactive learning sessions covered hygiene, discipline, and moral values to inspire young minds and support holistic development.',
    image: '/schoolvisit.jpg',
    accent: '#d1a24e',
  },
]

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

function ArrowIcon({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  const path =
    direction === 'left'
      ? 'M14.5 5 7.5 12l7 7M8 12h9'
      : 'm9.5 5 7 7-7 7M16 12H7'

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 7 8 5-8 5V7Z" fill="currentColor" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7 5.3 5.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.4 15.4A7.5 7.5 0 0 1 8.6 4.6a7.6 7.6 0 1 0 10.8 10.8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {open ? (
        <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      )}
    </svg>
  )
}

function AssetFrame({
  src,
  alt,
  label,
  kind,
  className,
}: {
  src: string
  alt: string
  label: string
  kind: AssetKind
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={joinClassNames('asset-frame', 'asset-frame--' + kind, className)}>
      <div className="asset-fallback" aria-hidden="true">
        <span className="asset-fallback__grid" />
        <span className="asset-fallback__label">{label}</span>
      </div>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={kind === 'logo' ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

function NssSeal({
  className,
  alt = 'National Service Scheme logo',
  decorative = false,
}: {
  className?: string
  alt?: string
  decorative?: boolean
}) {
  return (
    <span className={joinClassNames('nss-seal', className)} aria-hidden={decorative ? true : undefined}>
      <span className="nss-seal__glow" />
      <img src="/NSS Logo.png" alt={decorative ? '' : alt} />
    </span>
  )
}

function PuzzleTiles({
  className,
  count,
  columns = 5,
  emptyIndex,
}: {
  className?: string
  count: number
  columns?: number
  emptyIndex?: number
}) {
  const totalRows = Math.ceil(count / columns)

  return (
    <div className={joinClassNames('puzzle-tiles', className)} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => {
        const row = Math.floor(index / columns)
        const column = index % columns
        const isEmpty = index === emptyIndex

        return (
          <span
            className={joinClassNames(
              'puzzle-tile',
              'puzzle-tile--shape-' + ((row + column) % 2 === 0 ? 'a' : 'b'),
              isEmpty && 'puzzle-tile--gap',
            )}
            key={index}
            style={
              {
                '--piece-delay': String((totalRows - row - 1) * 150 + column * 44) + 'ms',
                '--piece-tone': String(index % 7),
                '--piece-entry-x': String((column - (columns - 1) / 2) * 12) + 'px',
                '--piece-entry-y': String((totalRows - row) * 26) + 'px',
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
}

function WallShader() {
  const totalColumns = 5
  const totalRows = 9

  return (
    <div className="wall-shader" aria-hidden="true">
      <span className="wall-shader__halo" />
      <span className="wall-shader__motto">NOT ME<br />BUT YOU</span>
      {Array.from({ length: totalColumns * totalRows }, (_, index) => {
        const row = Math.floor(index / totalColumns)
        const column = index % totalColumns

        return (
          <span
            className={joinClassNames('wall-block', 'wall-block--shape-' + ((row + column) % 2 === 0 ? 'a' : 'b'))}
            key={index}
            style={
              {
                '--wall-delay': String((totalRows - row - 1) * 82 + column * 23) + 'ms',
                '--wall-tone': String((index + row) % 7),
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
}

function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-label="Assembling the recruitment experience">
      <div className="loading-screen__aurora" />
      <div className="loading-screen__noise" />
      <div className="loading-screen__content">
        <p className="eyebrow">National Service Scheme / SCE KIIT</p>
        <div className="loader-puzzle__stage">
          <PuzzleTiles className="loader-puzzle" count={15} columns={5} emptyIndex={7} />
          <div className="loader-puzzle__emblem" aria-hidden="true">
            <span className="loader-puzzle__emblem-piece" />
            <NssSeal className="loader-puzzle__seal" decorative />
          </div>
        </div>
        <p className="loading-screen__motto">
          <span>The National Service Scheme motto</span>
          <strong>Not Me, But You</strong>
        </p>
        <div className="loading-screen__copy">
          <span>Building a place for every strength</span>
          <strong>{String(progress).padStart(2, '0')}%</strong>
        </div>
      </div>
    </div>
  )
}

function PremiumRail({
  sectionId,
  eyebrow,
  title,
  description,
  items,
  kind,
}: {
  sectionId: string
  eyebrow: string
  title: string
  description: string
  items: RailItem[]
  kind: 'domain' | 'project'
}) {
  const railRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const pauseUntilRef = useRef(0)
  const scrollFrameRef = useRef<number | null>(null)
  const dragRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    startScrollLeft: 0,
    didMove: false,
  })
  const suppressClickRef = useRef(false)
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const autoDelay = kind === 'domain' ? 5600 : 6800

  function selectSlide(requestedIndex: number, behavior: ScrollBehavior = 'smooth') {
    const nextIndex = (requestedIndex + items.length) % items.length
    activeRef.current = nextIndex
    setActive(nextIndex)
    setCycle((currentCycle) => currentCycle + 1)

    window.requestAnimationFrame(() => {
      const rail = railRef.current
      const card = rail?.children.item(nextIndex) as HTMLElement | null

      if (!rail || !card) {
        return
      }

      rail.scrollTo({
        left: Math.max(0, card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2),
        behavior,
      })
    })
  }

  const advanceRail = useEffectEvent(() => {
    if (Date.now() >= pauseUntilRef.current) {
      selectSlide(activeRef.current + 1)
    }
  })

  useEffect(() => {
    const interval = window.setInterval(() => advanceRail(), autoDelay)
    return () => window.clearInterval(interval)
  }, [autoDelay])

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
      }
    }
  }, [])

  function getClosestIndex(rail: HTMLDivElement) {
    const railCenter = rail.scrollLeft + rail.clientWidth / 2
    let closestIndex = 0
    let smallestDistance = Number.POSITIVE_INFINITY

    Array.from(rail.children).forEach((child, index) => {
      const card = child as HTMLElement
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - railCenter)

      if (distance < smallestDistance) {
        smallestDistance = distance
        closestIndex = index
      }
    })

    return closestIndex
  }

  function handleScroll() {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current)
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const rail = railRef.current
      if (!rail) {
        return
      }

      const closestIndex = getClosestIndex(rail)

      if (closestIndex !== activeRef.current) {
        activeRef.current = closestIndex
        setActive(closestIndex)
        setCycle((currentCycle) => currentCycle + 1)
      }
    })
  }

  function pauseAutoAdvance(delay = 6200) {
    pauseUntilRef.current = Date.now() + delay
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      pauseAutoAdvance()
      selectSlide(activeRef.current - 1)
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      pauseAutoAdvance()
      selectSlide(activeRef.current + 1)
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    const rail = railRef.current
    if (!rail) {
      return
    }

    pauseAutoAdvance(9600)
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
      didMove: false,
    }
    rail.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current
    const drag = dragRef.current

    if (!rail || drag.pointerId !== event.pointerId) {
      return
    }

    const distance = event.clientX - drag.startX
    if (Math.abs(distance) > 4) {
      drag.didMove = true
    }

    rail.scrollLeft = drag.startScrollLeft - distance
  }

  function finishPointerDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current
    const drag = dragRef.current

    if (drag.pointerId !== event.pointerId) {
      return
    }

    if (rail?.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId)
    }

    const didMove = drag.didMove
    dragRef.current.pointerId = null
    dragRef.current.didMove = false
    setIsDragging(false)
    pauseAutoAdvance(didMove ? 6200 : 4400)

    if (!rail || !didMove) {
      return
    }

    suppressClickRef.current = true
    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 0)
    selectSlide(getClosestIndex(rail))
  }

  return (
    <section className={joinClassNames('content-section', 'content-section--rail', 'content-section--' + kind)} id={sectionId}>
      <div className="section-copy section-copy--split">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </div>

      <div className="rail-toolbar">
        <span className="rail-toolbar__count">
          {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <span className="rail-toolbar__hint">Swipe, drag or use the arrows</span>
        <div className="rail-toolbar__controls">
          <button
            className="circle-button"
            type="button"
            onClick={() => {
              pauseAutoAdvance()
              selectSlide(activeRef.current - 1)
            }}
            aria-label={'Show previous ' + kind}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            className="circle-button"
            type="button"
            onClick={() => {
              pauseAutoAdvance()
              selectSlide(activeRef.current + 1)
            }}
            aria-label={'Show next ' + kind}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div
        className={joinClassNames('premium-rail', isDragging && 'premium-rail--dragging')}
        ref={railRef}
        role="region"
        aria-label={title + ' carousel'}
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
            className={joinClassNames('premium-card', active === index && 'premium-card--active')}
            key={item.id}
            style={{ '--card-accent': item.accent } as CSSProperties}
            onClick={() => {
              if (suppressClickRef.current) {
                return
              }

              if (active !== index) {
                pauseAutoAdvance()
                selectSlide(index)
              }
            }}
          >
            <div className="premium-card__visual">
              <AssetFrame
                src={item.image}
                alt={item.title + ' visual'}
                label={item.title}
                kind={kind === 'domain' ? 'domain' : 'project'}
              />
              <span className="premium-card__serial">0{index + 1}</span>
            </div>
            <div className="premium-card__body">
              <p>{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <span className="premium-card__line" />
              <p className="premium-card__description">{item.description}</p>
              <span className="premium-card__discover">Explore the piece <ArrowIcon /></span>
            </div>
          </article>
        ))}
      </div>

      <div className="rail-progress" aria-hidden="true">
        <span key={cycle} style={{ '--rail-delay': String(autoDelay) + 'ms' } as CSSProperties} />
      </div>

      <div className="rail-mobile-controls" aria-label={title + ' carousel controls'}>
        <button
          type="button"
          onClick={() => {
            pauseAutoAdvance()
            selectSlide(activeRef.current - 1)
          }}
        >
          <ArrowIcon direction="left" />
          <span>Previous</span>
        </button>
        <button
          type="button"
          onClick={() => {
            pauseAutoAdvance()
            selectSlide(activeRef.current + 1)
          }}
        >
          <span>Next</span>
          <ArrowIcon />
        </button>
      </div>
    </section>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = window.localStorage.getItem('nss-sce-theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [eventIndex, setEventIndex] = useState(0)
  const [eventCycle, setEventCycle] = useState(0)
  const diaryPauseUntilRef = useRef(0)
  const diaryAutoDelay = 6500
  const selectedEvent = eventDiary[eventIndex]

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduceMotion ? 480 : 2700
    const startedAt = window.performance.now()
    let frame = 0
    let exitTimer = 0

    function advance(now: number) {
      const nextProgress = Math.min(100, Math.round(((now - startedAt) / duration) * 100))
      setProgress(nextProgress)

      if (nextProgress < 100) {
        frame = window.requestAnimationFrame(advance)
      } else {
        exitTimer = window.setTimeout(() => setLoading(false), reduceMotion ? 80 : 320)
      }
    }

    frame = window.requestAnimationFrame(advance)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(exitTimer)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('nss-sce-theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const advanceDiary = useEffectEvent(() => {
    if (Date.now() < diaryPauseUntilRef.current) {
      return
    }

    setEventIndex((currentIndex) => (currentIndex + 1) % eventDiary.length)
    setEventCycle((currentCycle) => currentCycle + 1)
  })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const interval = window.setInterval(() => advanceDiary(), diaryAutoDelay)
    return () => window.clearInterval(interval)
  }, [diaryAutoDelay])

  function pauseDiaryAutoAdvance(delay = diaryAutoDelay) {
    diaryPauseUntilRef.current = Date.now() + delay
    setEventCycle((currentCycle) => currentCycle + 1)
  }

  function selectDiaryEvent(requestedIndex: number) {
    diaryPauseUntilRef.current = Date.now() + diaryAutoDelay + 1800
    setEventIndex((requestedIndex + eventDiary.length) % eventDiary.length)
    setEventCycle((currentCycle) => currentCycle + 1)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="h-full m-0 mt-0 p-0 pt-0">
      <div className="site-shell h-full" data-theme={theme}>
        <div className="ambient-puzzle" aria-hidden="true">
          <WallShader />
        </div>
        <div className="grain" aria-hidden="true" />

        <header className="site-header">
          <a className="brand" href="#top" aria-label="NSS SCE KIIT home">
            <NssSeal className="brand__mark" alt="NSS SCE KIIT logo" />
            <span className="brand__copy">
              <strong>NSS SCE</strong>
              <span>KIIT</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#story">The story</a>
            <a href="#domains">Domains</a>
            <a href="#projects">Projects</a>
            <a href="#diary">Impact</a>
          </nav>

          <div className="header-actions">
            <button
              className="theme-switch"
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme'}
            >
              <span className="theme-switch__icon">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
            <a className="button button--header" href={applicationUrl} target="_blank" rel="noreferrer">
              Apply now
              <ArrowIcon />
            </a>
            <button
              className="menu-button"
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </header>

        <div className={joinClassNames('mobile-menu', menuOpen && 'mobile-menu--open')}>
          <nav aria-label="Mobile navigation">
            <a href="#story" onClick={closeMenu}>The story</a>
            <a href="#domains" onClick={closeMenu}>Domains</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#diary" onClick={closeMenu}>Impact diary</a>
            <a href="#connect" onClick={closeMenu}>Connect</a>
            <a href={applicationUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Apply now</a>
          </nav>
          <p>Every contribution matters.</p>
        </div>

        <main id="top">
          <section className="hero" aria-labelledby="hero-title">
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
                  Every volunteer is unique. Every skill has a place. Every contribution matters. The only missing piece is <strong>you.</strong>
                </p>
                <div className="hero__actions">
                  <a className="button button--primary" href={applicationUrl} target="_blank" rel="noreferrer">
                    Be the missing piece
                    <ArrowIcon />
                  </a>
                  <a className="text-link" href="#story">
                    See why you matter
                    <span />
                  </a>
                </div>
              </div>

              <div className="hero__visual" aria-label="An abstract puzzle with one piece labelled you">
                <span className="hero__orbit hero__orbit--one">CREATE / SERVE / LEAD /</span>
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
                    <span>THE LAST PIECE</span>
                    <strong>YOU</strong>
                  </div>
                  <div className="hero-puzzle__logo">
                    <NssSeal alt="NSS SCE KIIT emblem" />
                  </div>
                </div>
                <div className="hero__stamp">
                  <span>NSS Motto</span>
                  <strong>Not Me,<br />But You</strong>
                </div>
              </div>
            </div>

            <div className="hero__footer">
              <p>Scroll to find where your piece fits</p>
              <span className="hero__scroll-line" />
              <div className="hero__facts">
                <span>01 / 01</span>
                <span>Made of many strengths</span>
              </div>
            </div>
          </section>

          <section className="content-section story-section" id="story">
            <div className="section-copy story-section__copy">
              <p className="eyebrow">The missing piece</p>
              <h2>NSS is a puzzle built by people who show up for others.</h2>
              <p>
                Over the years, countless volunteers, coordinators, and seniors have brought their own skills, ideas, and effort to NSS SCE KIIT. Together, they create something meaningful. Still, the picture has room for one more piece.
              </p>
            </div>

            <div className="story-panel">
              <div className="story-panel__copy">
                <span className="story-panel__number">01</span>
                <p>Some lead. Some design. Some speak, write, photograph, manage, organise, and serve. No strength is too small to matter.</p>
                <span className="story-panel__line" />
                <p className="story-panel__accent">This campaign shifts the spotlight from the organisation to the applicant: NSS needs your distinct way of making a difference.</p>
              </div>
              <div className="story-panel__puzzle">
                <PuzzleTiles count={20} columns={5} />
              </div>
            </div>
          </section>

          <section className="content-section story-brief">
            <div className="story-brief__intro">
              <p className="eyebrow">The applicant is the answer</p>
              <h2>We are not simply asking you to join. We are showing you where NSS needs you.</h2>
            </div>
            <div className="story-brief__grid">
              <article className="story-brief__card">
                <span>01 / A unique shape</span>
                <h3>Every individual carries something distinct.</h3>
                <p>Every volunteer brings a different set of skills, ideas, and efforts. Like a puzzle piece, every person has a shape and purpose that cannot be replaced.</p>
              </article>
              <article className="story-brief__card story-brief__card--accent">
                <span>02 / The missing piece</span>
                <h3>You are not another addition to NSS.</h3>
                <p>You are the missing piece that helps complete it. From your very first step, your contribution is important and valued.</p>
              </article>
              <article className="story-brief__card">
                <span>03 / The whole picture</span>
                <h3>When every strength meets, the picture becomes whole.</h3>
                <p>Existing volunteers, seniors, coordinators, and new recruits come together to build an organisation shaped by everyone who chooses to be part of it.</p>
              </article>
            </div>
          </section>

          <section className="content-section video-section">
            <div className="video-section__copy">
              <p className="eyebrow">See the picture move</p>
              <h2>Service has a rhythm.</h2>
              <p>The work is hands-on, people-first, and always bigger than a single person.</p>
              <a className="text-link" href="#diary">
                Explore the event diary
                <span />
              </a>
            </div>
            <div className="video-card">
              <div className="video-card__topbar">
                <span>Field reel / NSS SCE KIIT</span>
                <span className="video-card__live"><i /> Ready</span>
              </div>
              <div className="video-card__frame">
                <iframe
                  src="https://player.vimeo.com/video/1106909037?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=0&muted=1"
                  title="NSS SCE KIIT promotional video"
                  allow="autoplay; fullscreen; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <div className="video-card__cover" aria-hidden="true">
                  <span><PlayIcon /></span>
                  <p>Play the story</p>
                </div>
              </div>
              <div className="video-card__footer">
                <span>Not Me, But You</span>
                <span>00:45</span>
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
              <p>The organisation is not built by a few individuals. It is built by everyone who chooses to be a part of it.</p>
              <span className="manifesto-section__mark manifesto-section__mark--end">"</span>
            </div>
            <div className="manifesto-section__pieces">
              <div>
                <span>01</span>
                <h3>Every volunteer is unique.</h3>
              </div>
              <div>
                <span>02</span>
                <h3>Every skill has a place.</h3>
              </div>
              <div>
                <span>03</span>
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
                <p className="eyebrow">2025 event diary</p>
                <h2>Moments that became more than moments.</h2>
              </div>
              <p>From health support to awareness drives, every field note tells the story of students choosing action over apathy.</p>
            </div>

            <div
              className="diary-window"
              style={{ '--event-accent': selectedEvent.accent } as CSSProperties}
              role="region"
              aria-label="Automated NSS event diary"
              onPointerEnter={() => pauseDiaryAutoAdvance()}
              onFocusCapture={() => pauseDiaryAutoAdvance()}
            >
              <div className="diary-window__visual" key={'visual-' + selectedEvent.id + '-' + eventCycle}>
                <AssetFrame
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  label={selectedEvent.title}
                  kind="event"
                />
                <div className="diary-window__tag">NSS field note</div>
                <span className="diary-window__count">{String(eventIndex + 1).padStart(2, '0')}</span>
              </div>
              <div className="diary-window__content" key={'content-' + selectedEvent.id + '-' + eventCycle}>
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
                    onClick={() => selectDiaryEvent(eventIndex - 1)}
                    aria-label="Show previous event"
                  >
                    <ArrowIcon direction="left" />
                  </button>
                  <span>{String(eventIndex + 1).padStart(2, '0')} of {String(eventDiary.length).padStart(2, '0')}</span>
                  <button
                    className="circle-button"
                    type="button"
                    onClick={() => selectDiaryEvent(eventIndex + 1)}
                    aria-label="Show next event"
                  >
                    <ArrowIcon />
                  </button>
                </div>
              </div>
              <div className="diary-window__autoplay" aria-hidden="true">
                <span key={eventCycle} style={{ '--diary-delay': String(diaryAutoDelay) + 'ms' } as CSSProperties} />
              </div>
            </div>

            <div className="diary-tabs" role="tablist" aria-label="Choose an event">
              {eventDiary.map((event, index) => (
                <button
                  className={joinClassNames('diary-tab', eventIndex === index && 'diary-tab--active')}
                  key={event.id}
                  type="button"
                  role="tab"
                  aria-selected={eventIndex === index}
                  onClick={() => selectDiaryEvent(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
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
              <a className="button button--primary" href={applicationUrl} target="_blank" rel="noreferrer">
                Apply for recruitment
                <ArrowIcon />
              </a>
            </div>

            <div className="connect-section__grid">
              <article className="connect-card connect-card--about">
                <span className="connect-card__index">01</span>
                <h3>Stay close to the work.</h3>
                <p>Connect with NSS SCE KIIT to stay updated with activities, events, and community service initiatives.</p>
                <a href="https://nss.kiit.ac.in/" target="_blank" rel="noreferrer" className="text-link">
                  NSS KIIT home page
                  <span />
                </a>
              </article>
              <article className="connect-card">
                <span className="connect-card__index">02</span>
                <p className="connect-card__label">Follow the unit</p>
                <a href="https://www.instagram.com/nss.sce.kiit/?hl=en" target="_blank" rel="noreferrer" className="connect-card__link">
                  Instagram
                  <ArrowIcon />
                </a>
                <a href="https://www.youtube.com/c/NSSSCE" target="_blank" rel="noreferrer" className="connect-card__link">
                  YouTube
                  <ArrowIcon />
                </a>
                <a href="https://www.linkedin.com/company/nss-sce-kiit/" target="_blank" rel="noreferrer" className="connect-card__link">
                  LinkedIn
                  <ArrowIcon />
                </a>
              </article>
              <article className="connect-card connect-card--contacts">
                <span className="connect-card__index">03</span>
                <p className="connect-card__label">For further information</p>
                <a href="tel:+917635088808">Piyush Agrawal <span>+91 76350 88808</span></a>
                <a href="tel:+918709914709">Ankit Kumar <span>+91 87099 14709</span></a>
                <a href="tel:+917985078516">Kaustubh Rastogi <span>+91 79850 78516</span></a>
              </article>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <p>© 2026 NSS SCE KIIT</p>
          <p>National Service Scheme / School of Computer Engineering</p>
          <a href="#top">Back to top <ArrowIcon /></a>
        </footer>

        <a className="mobile-apply" href={applicationUrl} target="_blank" rel="noreferrer">
          Apply now
          <ArrowIcon />
        </a>
      </div>

      {loading && <LoadingScreen progress={progress} />}
    </div>
  )
}

export default App
