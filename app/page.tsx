'use client'

import { useEffect, useState } from 'react'

/* ============================
   INLINE SVG ICONS (Heroicons v2)
   ============================ */

const icons = {
  phone: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>',
  shield: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>',
  scale: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z"/></svg>',
  trophy: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.45-8.865 6.003 6.003 0 01-5.45 8.865"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>',
  briefcase: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"/></svg>',
  document: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>',
  home: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"/></svg>',
  handRaised: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"/></svg>',
  star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"/></svg>',
  chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>',
  bars3: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>',
  xMark: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>',
  buildingOffice: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg>',
}

function Icon({ name, className }: { name: keyof typeof icons; className?: string }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: icons[name] }}
      aria-hidden="true"
    />
  )
}

/* ============================
   SERVICE ICONS MAP
   ============================ */

const serviceIcons: (keyof typeof icons)[] = [
  'scale',
  'shield',
  'users',
  'briefcase',
  'document',
  'home',
]

/* ============================
   TRUST BAR ICONS MAP
   ============================ */

const trustIcons: (keyof typeof icons)[] = ['shield', 'trophy', 'clock', 'users']

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    /* Scroll reveal observer */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const animatedElements = document.querySelectorAll('[data-animate]')
    animatedElements.forEach((el) => observer.observe(el))

    /* Nav scroll shadow */
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* =========== NAV =========== */}
      <nav className={`nav${navScrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#" className="nav-logo" aria-label="{'Ray Rodriguez Law Office'} home">
            {'Ray Rodriguez Law Office'}
          </a>

          <ul className={`nav-links${mobileMenuOpen ? ' mobile-open' : ''}`}>
            <li><a href="#services" style={{ cursor: 'pointer' }}>Practice Areas</a></li>
            <li><a href="#about" style={{ cursor: 'pointer' }}>About</a></li>
            <li><a href="#testimonials" style={{ cursor: 'pointer' }}>Testimonials</a></li>
            <li>
              <a
                href={'tel:13058851255'}
                className="nav-cta"
                aria-label="Call {'Ray Rodriguez Law Office'} at {'+1 305-885-1255'}"
                style={{ cursor: 'pointer' }}
              >
                <Icon name="phone" className="btn-icon" />
                {'+1 305-885-1255'}
              </a>
            </li>
          </ul>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            style={{ cursor: 'pointer' }}
          >
            <Icon name={mobileMenuOpen ? 'xMark' : 'bars3'} className="btn-icon" />
          </button>
        </div>
      </nav>

      {/* =========== HERO =========== */}
      <section className="hero">
        <div className="hero-image-wrap">
          <img
            src={'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80'}
            alt=""
            loading="eager"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <Icon name="shield" className="hero-badge-icon" />
            Trusted Legal Counsel in {'Hialeah'}, {'FL'}
          </div>

          <h1>Experienced Attorneys Fighting for Your Rights</h1>

          <p className="hero-subtitle">
            When your future is on the line, you deserve a legal team with a proven track record of results.
            {'Ray Rodriguez Law Office'} provides aggressive, compassionate representation for clients across {'Hialeah'} and {'FL'}.
          </p>

          <div className="hero-actions">
            <a
              href={'tel:13058851255'}
              className="btn-primary"
              aria-label="Call {'Ray Rodriguez Law Office'} for a free consultation"
              style={{ cursor: 'pointer' }}
            >
              <Icon name="phone" className="btn-icon" />
              Free Consultation
            </a>
            <a
              href="#services"
              className="btn-secondary"
              style={{ cursor: 'pointer' }}
            >
              Our Practice Areas
              <Icon name="chevronDown" className="btn-icon" />
            </a>
          </div>
        </div>
      </section>

      {/* =========== TRUST BAR =========== */}
      <section className="trust-bar" aria-label="Credentials and trust indicators">
        <div className="trust-bar-inner">
          {[
            'Serving Hialeah Families for Over 15 Years',
            'Bilingual Legal Team — English & Spanish',
            'Thousands of Cases Resolved Across Miami-Dade',
            'Free Initial Consultations — No Obligation',
          ].map((text, i) => (
            <div className="trust-item" key={i} data-animate data-delay={i + 1}>
              <div className="trust-icon">
                <Icon name={trustIcons[i]} />
              </div>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========== SERVICES =========== */}
      <section className="section services-section" id="services">
        <div className="section-header" data-animate>
          <span className="section-label">Practice Areas</span>
          <h2 className="section-title">Comprehensive Legal Representation</h2>
          <p className="section-subtitle">
            Our attorneys bring decades of combined experience across a wide range of legal disciplines,
            delivering strategic counsel tailored to your unique situation.
          </p>
        </div>

        <div className="services-grid">
          {([
            { title: 'Personal Injury Claims', desc: 'Injured in an accident on Palm Avenue or anywhere in Miami-Dade? Ray Rodriguez Law Office fights to get you the maximum compensation you deserve, so you can focus on healing.' },
            { title: 'Family Law & Divorce', desc: 'Navigating divorce, custody, or support issues is never easy. We guide Hialeah families through every step with discretion, compassion, and aggressive advocacy when it counts.' },
            { title: 'Immigration Law', desc: 'Serving Hialeah\'s vibrant immigrant community with visa petitions, green card applications, asylum cases, and deportation defense. We speak your language — literally and legally.' },
            { title: 'Criminal Defense', desc: 'Facing charges in Miami-Dade County? From misdemeanors to felonies, we build airtight defense strategies and protect your rights from arraignment through trial.' },
            { title: 'Real Estate & Closings', desc: 'Buying or selling property in Hialeah\'s competitive market demands sharp legal oversight. We handle closings, title searches, and contract disputes so nothing falls through the cracks.' },
            { title: 'Estate Planning & Probate', desc: 'Protect your family\'s future with wills, trusts, and powers of attorney tailored to Florida law. When probate is unavoidable, we streamline the process and minimize stress.' },
          ] as const).map((service, i) => (
            <div
              className="service-card"
              key={i}
              data-animate
              data-delay={i + 1}
            >
              <div className="service-icon-wrap">
                <Icon name={serviceIcons[i]} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========== ABOUT =========== */}
      <section className="section about-section" id="about">
        <div className="about-inner">
          <div className="about-image-wrap" data-animate>
            <img
              src={'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1400&q=80'}
              alt=""
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            />
          </div>

          <div className="about-content" data-animate data-delay="2">
            <span className="section-label">About the Firm</span>
            <h2>Why Choose {'Ray Rodriguez Law Office'}</h2>
            <p>{'Ray Rodriguez Law Office was built on a simple idea: that every person in Hialeah deserves the same caliber of legal representation you would find in a downtown Miami high-rise — without the pretense. Rooted in this community and fluent in its culture, Ray Rodriguez and his team bring sharp legal strategy and genuine personal attention to every case that walks through the door. Whether you are facing a legal crisis or planning for the future, this is the Hialeah law office that treats your case like it is the only one that matters.'}</p>

            <div className="about-stats">
              <div className="about-stat" data-animate data-delay="3">
                <span className="about-stat-number">500+</span>
                <span className="about-stat-label">Cases Won</span>
              </div>
              <div className="about-stat" data-animate data-delay="4">
                <span className="about-stat-number">25+</span>
                <span className="about-stat-label">Years Experience</span>
              </div>
              <div className="about-stat" data-animate data-delay="5">
                <span className="about-stat-number">98%</span>
                <span className="about-stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========== TESTIMONIALS =========== */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-header" data-animate>
          <span className="section-label">Client Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Our clients&apos; outcomes speak for themselves. Here&apos;s what people throughout {'Hialeah'} have to say about working with our legal team.
          </p>
        </div>

        <div className="testimonials-grid">
          {[
            {
              quote:
                'After my accident, I didn\'t know where to turn. The attorneys at this firm fought tirelessly for my case and secured a settlement that covered all my medical expenses and lost wages.',
              name: 'Sarah M.',
              role: 'Personal Injury Client',
              initials: 'SM',
            },
            {
              quote:
                'During one of the most difficult times of my life, this firm provided not just excellent legal counsel but genuine compassion. They guided me through every step of the process with professionalism.',
              name: 'James R.',
              role: 'Family Law Client',
              initials: 'JR',
            },
            {
              quote:
                'I was facing serious charges and felt completely overwhelmed. My attorney was available around the clock, prepared meticulously for trial, and achieved a result I never thought possible.',
              name: 'Michael T.',
              role: 'Criminal Defense Client',
              initials: 'MT',
            },
          ].map((testimonial, i) => (
            <div
              className="testimonial-card"
              key={i}
              data-animate
              data-delay={i + 1}
            >
              <div className="testimonial-stars">
                {[...Array(5)].map((_, j) => (
                  <Icon name="star" key={j} />
                ))}
              </div>
              <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.initials}</div>
                <div>
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========== CTA BANNER =========== */}
      <section className="cta-section" data-animate>
        <div className="cta-inner">
          <h2>Contact {'Ray Rodriguez Law Office'}</h2>
          <p>
            Don&apos;t face your legal challenges alone. Our experienced attorneys are ready to review your case
            and discuss your options in a free, confidential consultation.
          </p>
          <a
            href={'tel:13058851255'}
            className="btn-primary"
            aria-label="Call {'Ray Rodriguez Law Office'} at {'+1 305-885-1255'}"
            style={{ cursor: 'pointer' }}
          >
            <Icon name="phone" className="btn-icon" />
            Call {'+1 305-885-1255'}
          </a>
        </div>
      </section>

      {/* =========== FOOTER =========== */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>{'Ray Rodriguez Law Office'}</h3>
            <p>
              Providing dedicated legal representation to individuals and families across {'Hialeah'}, {'FL'}.
              Committed to justice, integrity, and achieving the best possible outcomes for our clients.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <Icon name="mapPin" className="btn-icon" />
              <span>{'102 Hialeah Dr, Hialeah, FL 33010, USA'}, {'Hialeah'}, {'FL'}</span>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Practice Areas</h4>
            <ul className="footer-links">
              <li><a href="#services" style={{ cursor: 'pointer' }}>{'Personal Injury Claims'}</a></li>
              <li><a href="#services" style={{ cursor: 'pointer' }}>{'Family Law & Divorce'}</a></li>
              <li><a href="#services" style={{ cursor: 'pointer' }}>{'Immigration Law'}</a></li>
              <li><a href="#services" style={{ cursor: 'pointer' }}>{'Criminal Defense'}</a></li>
              <li><a href="#services" style={{ cursor: 'pointer' }}>{'Real Estate & Closings'}</a></li>
              <li><a href="#services" style={{ cursor: 'pointer' }}>{'Estate Planning & Probate'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href={'tel:13058851255'} style={{ cursor: 'pointer' }}>
                  {'+1 305-885-1255'}
                </a>
              </li>
              <li>{'102 Hialeah Dr, Hialeah, FL 33010, USA'}</li>
              <li>{'Hialeah'}, {'FL'}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {'Ray Rodriguez Law Office'}. All rights reserved.</span>
          <span>Serving {'Hialeah'}, {'FL'} and surrounding areas</span>
        </div>
      </footer>
    </>
  )
}