import { useState, useEffect } from 'react'

const WA_NUMBER = '5493518027015'
const WA_MSG = encodeURIComponent('Hola! Consulto por disponibilidad en Windhaus, Villa General Belgrano.')

const NAV_LINKS = [
  { label: 'Las casas', href: '#casas' },
  { label: 'Comodidades', href: '#comodidades' },
  { label: 'Qué hacer', href: '#quehacer' },
  { label: 'Contacto', href: '#contacto' },
]

const CASAS = [
  {
    nombre: 'Casa del Bosque',
    capacidad: 'Hasta 6 personas',
    img: 'https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?w=800&h=600&fit=crop&auto=format',
    desc: 'Rodeada de árboles añosos, terraza amplia y vista panorámica a las sierras.',
  },
  {
    nombre: 'Casa del Arroyo',
    capacidad: 'Hasta 4 personas',
    img: 'https://images.unsplash.com/photo-1680703486830-1b5af60635d7?w=800&h=600&fit=crop&auto=format',
    desc: 'A metros del arroyo, living con chimenea y deck privado con asador.',
  },
  {
    nombre: 'Casa del Valle',
    capacidad: 'Hasta 8 personas',
    img: 'https://images.unsplash.com/photo-1631756964162-25c8c07579b5?w=800&h=600&fit=crop&auto=format',
    desc: 'La más espaciosa, con ventanales de piso a techo y acceso directo a la piscina.',
  },
]

const COMODIDADES = [
  {
    label: 'Totalmente equipadas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Piscina',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M3 17c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1M3 13c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1M7 5a2 2 0 114 0v8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Vista a las sierras',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M2 20l5-9 4 6 3-4 8 7H2z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17" cy="5" r="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Exclusiva ubicación',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const GALERIA = [
  { img: 'https://images.unsplash.com/photo-1705783500980-9e65f003f78d?w=900&h=700&fit=crop&auto=format', alt: 'Vista de las sierras con casas' },
  { img: 'https://images.unsplash.com/photo-1652878856832-887df545cb0c?w=600&h=800&fit=crop&auto=format', alt: 'Piscina rodeada de naturaleza' },
  { img: 'https://images.unsplash.com/photo-1674761349831-0d494e9f5188?w=700&h=500&fit=crop&auto=format', alt: 'Paisaje de sierra y bosque' },
  { img: 'https://images.unsplash.com/photo-1632853359743-edcc974313f2?w=600&h=700&fit=crop&auto=format', alt: 'Bosque con montañas al fondo' },
  { img: 'https://images.unsplash.com/photo-1631941392209-70cad44ecfb7?w=800&h=600&fit=crop&auto=format', alt: 'Interior de cabaña con chimenea' },
  { img: 'https://images.unsplash.com/photo-1509600110300-21b9d5fedeb7?w=700&h=700&fit=crop&auto=format', alt: 'Pool house exterior' },
  { img: 'https://images.unsplash.com/photo-1629996201377-673b80f03f95?w=800&h=500&fit=crop&auto=format', alt: 'Bosque verde con nevado al fondo' },
  { img: 'https://images.unsplash.com/photo-1531149376654-4b84808dcfa8?w=600&h=900&fit=crop&auto=format', alt: 'Sierra cubierta de neblina' },
]

const QUE_HACER = [
  {
    id: 'oktoberfest',
    nombre: 'Oktoberfest',
    desc: '63ª edición del festival más importante de Argentina, con tradición alemana, música en vivo y la mejor gastronomía típica.',
    fechas: '2-3-4 y 9 al 12 de octubre 2026',
    img: 'https://images.unsplash.com/photo-1681208136909-72c69e295017?w=1200&h=600&fit=crop&auto=format',
    destacado: true,
  },
  {
    id: 'eventos',
    nombre: 'Eventos y festivales',
    desc: 'Durante todo el año, Villa General Belgrano ofrece festivales de chocolate, cerveza artesanal y música folclórica.',
    img: 'https://images.unsplash.com/photo-1760039756619-94cf22850ae0?w=700&h=500&fit=crop&auto=format',
    destacado: false,
  },
  {
    id: 'tour',
    nombre: 'Tour por Calamuchita',
    desc: 'Recorridos guiados por el valle, pueblos alemanes, embalses y miradores con vistas espectaculares.',
    img: 'https://images.unsplash.com/photo-1674761349831-0d494e9f5188?w=700&h=500&fit=crop&auto=format',
    destacado: false,
  },
  {
    id: 'delicias',
    nombre: 'Delicias locales',
    desc: 'Strudel, ciervo ahumado, cervezas artesanales y fondue en los mejores restaurantes del pueblo.',
    img: 'https://images.unsplash.com/photo-1760822400484-d7e9e2c6aacc?w=700&h=500&fit=crop&auto=format',
    destacado: false,
  },
  {
    id: 'pozoverde',
    nombre: 'Pozo Verde',
    desc: 'Laguna de aguas cristalinas color esmeralda, ideal para trekking y fotografía en medio de la naturaleza serrana.',
    img: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=700&h=500&fit=crop&auto=format',
    destacado: false,
  },
  {
    id: 'arroyos',
    nombre: 'Paseo de los Arroyos',
    desc: 'Un sendero que recorre arroyos de montaña con cascadas, pozas naturales y flora autóctona del Calamuchita.',
    img: 'https://images.unsplash.com/photo-1588421033046-d7c051d496eb?w=700&h=500&fit=crop&auto=format',
    destacado: false,
  },
]

const TESTIMONIOS = [
  {
    nombre: 'Lucía & Martín',
    origen: 'Rosario, Santa Fe',
    texto: 'Una experiencia única. Las casas son increíblemente cómodas y la vista a las sierras desde el deck es simplemente mágica. Volvemos sin dudas.',
    estrellas: 5,
  },
  {
    nombre: 'Familia Rodríguez',
    origen: 'Buenos Aires',
    texto: 'Fuimos con los chicos y quedaron maravillados con la piscina y los paseos. Windhaus tiene todo lo que necesitás para desconectarte de verdad.',
    estrellas: 5,
  },
  {
    nombre: 'Valentina S.',
    origen: 'Córdoba Capital',
    texto: 'El lugar ideal para el Oktoberfest. La ubicación es perfecta, a minutos del centro del pueblo y en un entorno natural espectacular.',
    estrellas: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="#D9962B">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

function WindhausLogo({ inverted = false }: { inverted?: boolean }) {
  const stroke = inverted ? '#F7F4EE' : '#1A1A1A'
  const fill = inverted ? '#F7F4EE' : '#1A1A1A'
  return (
    <div className="flex items-center gap-3">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="21" stroke={stroke} strokeWidth="1.5"/>
        <path d="M8 30 L14 22 L18 27 L22 18 L26 24 L30 20 L36 30" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 30 v-8 l6-5 6 5 v8" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 22 h16" stroke={stroke} strokeWidth="1" strokeLinecap="round"/>
        <rect x="19" y="24" width="6" height="6" stroke={stroke} strokeWidth="1" rx="0.5"/>
        <circle cx="22" cy="38" r="1.5" fill={fill} opacity="0.5"/>
        <circle cx="22" cy="6" r="1.5" fill={fill} opacity="0.5"/>
      </svg>
      <div>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.1em', fontSize: '1.1rem', color: inverted ? '#F7F4EE' : '#1A1A1A' }}>
          WINDHAUS
        </span>
        <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, letterSpacing: '0.18em', fontSize: '0.6rem', color: inverted ? '#F7F4EEaa' : '#1A1A1Aaa', marginTop: '-1px' }}>
          VILLA GENERAL BELGRANO
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ backgroundColor: '#F7F4EE', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>

      {/* ── HEADER ── */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          backgroundColor: scrolled ? 'rgba(26,26,26,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease',
          borderBottom: scrolled ? '1px solid rgba(247,244,238,0.08)' : 'none',
        }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          <a href="#hero"><WindhausLogo inverted /></a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden md:flex">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.08em', color: '#F7F4EEcc', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D9962B')}
                onMouseLeave={e => (e.currentTarget.style.color = '#F7F4EEcc')}
              >
                {l.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', backgroundColor: '#D9962B', color: '#1A1A1A', padding: '0.65rem 1.5rem', borderRadius: '2px', transition: 'background-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c4841f')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#D9962B')}
            >
              Reservar
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F7F4EE" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></>}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ backgroundColor: 'rgba(26,26,26,0.98)', borderTop: '1px solid rgba(247,244,238,0.1)', padding: '1.5rem 2rem 2rem' }}>
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.06em', color: '#F7F4EE', textDecoration: 'none', padding: '0.75rem 0', borderBottom: '1px solid rgba(247,244,238,0.08)' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank" rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'inline-block', marginTop: '1.25rem', fontFamily: 'Montserrat, sans-serif', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', backgroundColor: '#D9962B', color: '#1A1A1A', padding: '0.75rem 2rem', borderRadius: '2px' }}
            >
              Reservar
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{ position: 'relative', height: '100dvh', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #111a0f 0%, #1a2718 40%, #1e3020 70%, #2a2018 100%)' }}
      >
        {/* Grain texture */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
          <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
          <rect width="100%" height="100%" filter="url(#noise)"/>
        </svg>

        {/* Amber glow */}
        <div style={{ position: 'absolute', bottom: '-10%', left: '50%', transform: 'translateX(-50%)', width: '70%', height: '50%', background: 'radial-gradient(ellipse at center, rgba(166,124,82,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '15%', right: '10%', width: '30%', height: '40%', background: 'radial-gradient(ellipse at center, rgba(62,92,69,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Mountain silhouette SVG */}
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', pointerEvents: 'none' }}
        >
          {/* Far mountains */}
          <path d="M0,220 L120,140 L200,175 L310,90 L420,155 L520,80 L640,130 L720,60 L820,110 L920,50 L1040,120 L1140,70 L1260,140 L1360,100 L1440,130 L1440,300 L0,300 Z" fill="rgba(62,92,69,0.18)"/>
          {/* Mid mountains */}
          <path d="M0,260 L80,200 L180,230 L280,170 L380,210 L480,160 L580,200 L680,150 L780,195 L880,155 L980,200 L1100,165 L1200,205 L1310,170 L1440,210 L1440,300 L0,300 Z" fill="rgba(62,92,69,0.28)"/>
          {/* Near hills */}
          <path d="M0,290 L100,255 L220,270 L340,245 L460,265 L580,240 L700,260 L820,242 L940,258 L1060,244 L1180,260 L1300,248 L1440,265 L1440,300 L0,300 Z" fill="rgba(42,56,35,0.55)"/>
          {/* Ground */}
          <path d="M0,300 L1440,300 L1440,292 Q720,278 0,292 Z" fill="rgba(26,38,22,0.7)"/>
        </svg>

        {/* Stars */}
        {[...Array(28)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 4 === 0 ? 2 : 1,
            height: i % 4 === 0 ? 2 : 1,
            borderRadius: '50%',
            backgroundColor: '#F7F4EE',
            opacity: 0.2 + (i % 5) * 0.1,
            top: `${5 + (i * 37) % 55}%`,
            left: `${(i * 23 + 7) % 95}%`,
            pointerEvents: 'none',
          }}/>
        ))}

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 1.5rem', maxWidth: 820 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 400, letterSpacing: '0.28em', color: '#D9962B', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Valle de Calamuchita · Córdoba
          </p>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1.08, color: '#F7F4EE', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
            Tu casa en las sierras<br />de Calamuchita
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, color: 'rgba(247,244,238,0.82)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 580, margin: '0 auto 2.5rem' }}>
            Casas totalmente equipadas, con piscina, vista a las sierras y una ubicación exclusiva.
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', backgroundColor: '#D9962B', color: '#1A1A1A', padding: '1rem 2.5rem', borderRadius: '2px', transition: 'background-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c4841f')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#D9962B')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.122 1.527 5.858L0 24l6.313-1.491A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.79-.524-5.37-1.437L2.86 21.73l1.195-3.62A9.973 9.973 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Consultar disponibilidad
          </a>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.5 }}>
          <div style={{ width: 1, height: 48, backgroundColor: '#F7F4EE', animation: 'pulse 2s infinite' }} />
        </div>
      </section>

      {/* ── LAS CASAS ── */}
      <section id="casas" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', color: '#3E5C45', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Dónde vas a hospedarte</p>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A1A', lineHeight: 1.1 }}>Las casas</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {CASAS.map((casa) => (
            <div
              key={casa.nombre}
              style={{ backgroundColor: '#fff', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(26,26,26,0.07)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 40px rgba(26,26,26,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
            >
              <div style={{ height: 240, overflow: 'hidden', backgroundColor: '#d4c9b8' }}>
                <img src={casa.img} alt={casa.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.4rem' }}>{casa.nombre}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 500, color: '#3E5C45', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.9rem' }}>{casa.capacidad}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: '#1A1A1A99', lineHeight: 1.6, marginBottom: '1.5rem' }}>{casa.desc}</p>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: '#1A1A1A', borderBottom: '1.5px solid #D9962B', paddingBottom: '2px', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#D9962B')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#1A1A1A')}
                >
                  Ver más
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMODIDADES ── */}
      <section id="comodidades" style={{ backgroundColor: '#3E5C45', padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', color: '#D9962B', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Lo que incluye tu estadía</p>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#F7F4EE', lineHeight: 1.1 }}>Comodidades</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
            {COMODIDADES.map((c) => (
              <div key={c.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: '#D9962B' }}>{c.icon}</div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.04em', color: '#F7F4EE' }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', color: '#3E5C45', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Imágenes</p>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#1A1A1A', lineHeight: 1.1 }}>Galería</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto', gap: '0.75rem' }}>
          {GALERIA.map((item, i) => (
            <div
              key={i}
              style={{
                gridColumn: i === 0 ? 'span 2' : i === 1 ? 'span 1' : 'span 1',
                gridRow: i === 0 ? 'span 2' : 'span 1',
                height: i === 0 ? 520 : i === 1 ? 260 : 260,
                backgroundColor: '#d4c9b8',
                overflow: 'hidden',
                borderRadius: '3px',
              }}
            >
              <img
                src={item.img}
                alt={item.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)')}
                onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── QUÉ HACER ── */}
      <section id="quehacer" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)', backgroundColor: '#F0EDE5' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', color: '#3E5C45', textTransform: 'uppercase', marginBottom: '0.75rem' }}>En el valle</p>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#1A1A1A', lineHeight: 1.1 }}>Qué hacer</h2>
          </div>

          {/* Oktoberfest featured */}
          <div style={{ marginBottom: '2rem', borderRadius: '4px', overflow: 'hidden', position: 'relative', height: 'clamp(280px, 40vw, 480px)', backgroundColor: '#2a1800' }}>
            <img
              src="https://images.unsplash.com/photo-1681208136909-72c69e295017?w=1600&h=700&fit=crop&auto=format"
              alt="Oktoberfest Villa General Belgrano"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
            />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem, 5vw, 4rem)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#D9962B', color: '#1A1A1A', padding: '0.4rem 1rem', borderRadius: '2px', marginBottom: '1.25rem', width: 'fit-content' }}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>63ª Edición · Destacado</span>
              </div>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#F7F4EE', marginBottom: '0.75rem', lineHeight: 1.1 }}>Oktoberfest</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: 'rgba(247,244,238,0.85)', maxWidth: 560, lineHeight: 1.6, marginBottom: '1rem' }}>
                El festival más importante de Argentina con tradición alemana, música en vivo y la mejor gastronomía típica.
              </p>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#D9962B', letterSpacing: '0.08em' }}>
                📅 2-3-4 y 9 al 12 de octubre 2026
              </p>
            </div>
          </div>

          {/* Other activities grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {QUE_HACER.filter(q => !q.destacado).map((act) => (
              <div
                key={act.id}
                style={{ backgroundColor: '#fff', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(26,26,26,0.06)' }}
              >
                <div style={{ height: 180, backgroundColor: '#c8bfb0', overflow: 'hidden' }}>
                  <img src={act.img} alt={act.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{act.nombre}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#1A1A1A80', lineHeight: 1.6 }}>{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', color: '#3E5C45', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Experiencias reales</p>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#1A1A1A', lineHeight: 1.1 }}>Huéspedes</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {TESTIMONIOS.map((t) => (
            <div key={t.nombre} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '4px', border: '1px solid rgba(26,26,26,0.07)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.75rem', fontFamily: 'Georgia, serif', fontSize: '4rem', lineHeight: 1, color: 'rgba(62,92,69,0.12)', userSelect: 'none' }}>"</div>
              <StarRating count={t.estrellas} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', lineHeight: 1.7, color: '#1A1A1ADD', margin: '1rem 0 1.5rem', fontStyle: 'italic' }}>"{t.texto}"</p>
              <div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>{t.nombre}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#3E5C45', fontWeight: 500 }}>{t.origen}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── UBICACIÓN ── */}
      <section style={{ backgroundColor: '#F0EDE5', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', color: '#3E5C45', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Cómo llegar</p>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#1A1A1A', lineHeight: 1.1, marginBottom: '1.5rem' }}>Ubicación</h2>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
              <svg style={{ minWidth: 20, marginTop: 2 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E5C45" strokeWidth="2" strokeLinecap="round">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>Villa General Belgrano</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: '#1A1A1A80', lineHeight: 1.6 }}>Valle de Calamuchita, Córdoba, Argentina<br />A 84 km de la ciudad de Córdoba</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '2rem' }}>
              <svg style={{ minWidth: 20, marginTop: 2 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E5C45" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: '#1A1A1A80', lineHeight: 1.6 }}>1:10 hs desde Córdoba por la Ruta Nacional 36 y Provincial 5</p>
            </div>
            <a
              href="https://maps.google.com/?q=Villa+General+Belgrano+Cordoba+Argentina"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', backgroundColor: '#3E5C45', color: '#F7F4EE', padding: '0.8rem 1.75rem', borderRadius: '2px' }}
            >
              Ver en Google Maps
            </a>
          </div>
          <div style={{ borderRadius: '4px', overflow: 'hidden', height: 380, backgroundColor: '#ccc', border: '1px solid rgba(26,26,26,0.1)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13629.98!2d-64.5467!3d-31.9806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943395ef22f89fcd%3A0x2a012d3a5a1cf80f!2sVilla%20General%20Belgrano%2C%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1"
              width="100%" height="100%"
              style={{ border: 'none' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Villa General Belgrano, Córdoba"
            />
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', color: '#3E5C45', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Hablemos</p>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#1A1A1A', lineHeight: 1.1, marginBottom: '1rem' }}>Contacto</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#1A1A1A80', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 440 }}>
              ¿Tenés preguntas sobre disponibilidad, tarifas o actividades? Escribinos y te respondemos a la brevedad.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#1A1A1A', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
                onMouseLeave={e => (e.currentTarget.style.color = '#1A1A1A')}
              >
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#25D36615', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.122 1.527 5.858L0 24l6.313-1.491A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.79-.524-5.37-1.437L2.86 21.73l1.195-3.62A9.973 9.973 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 400, color: '#1A1A1A66', letterSpacing: '0.05em', marginBottom: '1px' }}>WhatsApp</div>
                  351 802-7015
                </div>
              </a>

              <a
                href="mailto:windhaus.vgb@gmail.com"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#1A1A1A', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D9962B')}
                onMouseLeave={e => (e.currentTarget.style.color = '#1A1A1A')}
              >
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#D9962B15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D9962B" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 400, color: '#1A1A1A66', letterSpacing: '0.05em', marginBottom: '1px' }}>Email</div>
                  windhaus.vgb@gmail.com
                </div>
              </a>
            </div>

            {/* Social */}
            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a
                href="https://instagram.com/windhausvgb"
                target="_blank" rel="noopener noreferrer"
                style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#1A1A1A08', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background-color 0.2s' }}
                aria-label="Instagram @windhausvgb"
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#E10E7720')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1A1A1A08')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/windhausvgb"
                target="_blank" rel="noopener noreferrer"
                style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#1A1A1A08', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background-color 0.2s' }}
                aria-label="Facebook Windhaus"
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1877F220')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1A1A1A08')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@windhausvgb"
                target="_blank" rel="noopener noreferrer"
                style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#1A1A1A08', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background-color 0.2s' }}
                aria-label="TikTok @windhausvgb"
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1A1A1A20')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1A1A1A08')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>
                </svg>
              </a>
              <div style={{ marginLeft: '0.5rem' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#1A1A1A66' }}>@windhausvgb</p>
              </div>
            </div>
          </div>

          {/* CTA card */}
          <div style={{ backgroundColor: '#1A1A1A', borderRadius: '4px', padding: '3rem', color: '#F7F4EE' }}>
            <WindhausLogo inverted />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: 'rgba(247,244,238,0.7)', lineHeight: 1.7, margin: '2rem 0 2.5rem' }}>
              Reservá con anticipación para el Oktoberfest 2026 y asegurate tu lugar en el corazón de Villa General Belgrano.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', backgroundColor: '#D9962B', color: '#1A1A1A', padding: '1.1rem 2rem', borderRadius: '2px', textAlign: 'center', transition: 'background-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c4841f')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#D9962B')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.122 1.527 5.858L0 24l6.313-1.491A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.79-.524-5.37-1.437L2.86 21.73l1.195-3.62A9.973 9.973 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Consultar disponibilidad
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#1A1A1A', padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
            <WindhausLogo inverted />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              {NAV_LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '0.06em', color: 'rgba(247,244,238,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F7F4EE')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,244,238,0.5)')}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(247,244,238,0.1)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'rgba(247,244,238,0.35)' }}>
              © 2026 Windhaus · Villa General Belgrano, Córdoba, Argentina
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'rgba(247,244,238,0.35)' }}>
              Alquiler temporario · Valle de Calamuchita
            </p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{
          position: 'fixed', bottom: '1.75rem', right: '1.75rem', zIndex: 200,
          width: 56, height: 56, borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(37,211,102,0.5)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.122 1.527 5.858L0 24l6.313-1.491A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.79-.524-5.37-1.437L2.86 21.73l1.195-3.62A9.973 9.973 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>

    </div>
  )
}
