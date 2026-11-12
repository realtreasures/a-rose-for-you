import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Heart, Sparkles, Flower2, Plus } from 'lucide-react';

const roses = [
  { name: 'Red Rose', note: 'A love that speaks without a word.', meaning: 'PASSION · DEVOTION', src: 'https://images.unsplash.com/photo-1548094891-c4ba474?auto=format&fit=crop&w=1000&q=85' },
  { name: 'Pink Rose', note: 'A gentle kind of forever.', meaning: 'GRACE · ADMIRATION',
    src: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=1000&q=85' },
  { name: 'White Rose', note: 'The quiet beauty of a pure heart.', meaning: 'PURITY · NEW BEGINNINGS',
    src: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1000&q=85' },
  { name: 'Blue Rose', note: 'For the beautiful things yet to be.', meaning: 'MYSTERY · THE IMPOSSIBLE',
    src: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85' },
  { name: 'Yellow Rose', note: 'A little sunshine, wherever you are.', meaning: 'JOY · FRIENDSHIP',
    src: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85' },
];

const gallery = [
  { title: 'Velvet petals', label: '01 / TEXTURE', src: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85', cls: 'gallery-tall' },
  { title: 'A quiet bloom', label: '02 / FORM', src: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=1000&q=85', cls: 'gallery-small' },
  { title: 'Morning dew', label: '03 / LIGHT', src: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85', cls: 'gallery-wide' },
  { title: 'The rose garden', label: '04 / PLACE', src: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1000&q=85', cls: 'gallery-small second' },
  { title: 'Softly, it falls', label: '05 / MOMENT', src: 'https://images.unsplash.com/photo-1548094891-c4ba474?auto=format&fit=crop&w=1000&q=85', cls: 'gallery-medium' },
];

function PetalRain({ count = 17 }) {
  const petals = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: `${(i * 37 + 7) % 100}%`,
    delay: `${(i % 9) * -1.7}s`,
    duration: `${13 + (i % 7) * 2.2}s`,
    size: `${8 + (i % 5) * 3}px`,
    rotate: `${(i * 43) % 180}deg`,
  })), [count]);
  return <div className="petal-rain" aria-hidden="true">{petals.map((p, i) =>
    <i key={i} style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: `calc(${p.size} * 1.45)`, transform: `rotate(${p.rotate})` }} />
  )}</div>;
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return <motion.div className={className}
    initial={reduce ? false : { opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.16 }}
    transition={{ duration: .8, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>;
}

function RoseBloom({ opened, onClick }) {
  return <button className={`bloom-button ${opened ? 'is-open' : ''}`} onClick={onClick} aria-label={opened ? 'The rose has bloomed' : 'Open the rose'}>
    <span className="bloom-glow" />
    <span className="bloom-stem" />
    <span className="leaf leaf-left" /><span className="leaf leaf-right" />
    <span className="bloom">
      <i className="petal p1" /><i className="petal p2" /><i className="petal p3" />
      <i className="petal p4" /><i className="petal p5" /><i className="petal p6" />
      <i className="petal p7" /><i className="petal p8" /><i className="petal p9" />
      <i className="petal core" />
    </span>
    <span className="bloom-hint">{opened ? 'A little wish, just for you' : 'TOUCH TO BLOOM'}</span>
  </button>;
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return <main>
    <header className={`site-header ${scroll > 40 ? 'scrolled' : ''}`}>
      <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); goTo('home'); }}>
        <span className="brand-mark">✳</span><span>ROSE<span className="brand-light"> / ATELIER</span></span>
      </a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><span /><span /></button>
      <nav className={menuOpen ? 'nav-open' : ''}>
        <a href="#collection" onClick={(e) => { e.preventDefault(); goTo('collection'); }}>The collection</a>
        <a href="#gallery" onClick={(e) => { e.preventDefault(); goTo('gallery'); }}>In detail</a>
        <a href="#wish" onClick={(e) => { e.preventDefault(); goTo('wish'); }}>A little wish</a>
      </nav>
      <a className="header-note" href="#wish" onClick={(e) => { e.preventDefault(); goTo('wish'); }}>MADE WITH LOVE <Heart size={12} /></a>
    </header>

    <section className="hero" id="home">
      <div className="hero-grain" />
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <PetalRain count={19} />
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>A SMALL GESTURE, A THOUSAND FEELINGS</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: 1 }}>A Rose <em>for You</em></motion.h1>
        <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }}>Every rose tells a story,<br />and this one is for you.</motion.p>
        <motion.button className="discover-button" onClick={() => goTo('collection')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <span>Discover the beauty</span><ArrowDown size={15} />
        </motion.button>
      </div>
      <motion.div className="hero-rose-wrap" initial={{ opacity: 0, scale: .86, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.5, delay: .25, ease: [0.16, 1, 0.3, 1] }}>
        <div className="rose-halo" />
        <img className="hero-rose" src="https://images.unsplash.com/photo-1548094891-c4ba474?auto=format&fit=crop&w=1100&q=90" alt="A deep red rose in soft dramatic light" />
        <span className="rose-caption">FIG. 01 <i>—</i> THE LANGUAGE OF LOVE</span>
      </motion.div>
      <div className="hero-side-note">AN OPEN LETTER TO BEAUTY <span>✳</span> EST. IN A MOMENT</div>
      <div className="hero-bottom"><span>SCROLL TO WANDER</span><span className="bottom-line" /><span>01 — 05</span></div>
    </section>

    <section className="intro section-pad">
      <Reveal><p className="eyebrow dark">THE ART OF A FLOWER</p></Reveal>
      <Reveal delay={.08}><h2>More than a flower.<br /><em>A feeling, in full bloom.</em></h2></Reveal>
      <Reveal delay={.16}><p className="intro-copy">A rose can say what words sometimes cannot. It holds a thousand little meanings in every petal — a quiet reminder to pause, to feel, and to give beauty away.</p></Reveal>
      <div className="intro-stamp"><Flower2 size={25} strokeWidth={1} /><span>GROWN WITH<br />TENDERNESS</span></div>
    </section>

    <section className="collection section-pad" id="collection">
      <div className="section-heading">
        <Reveal><div><p className="eyebrow">THE ROSE COLLECTION / 01</p><h2>Five shades of <em>feeling.</em></h2></div></Reveal>
        <Reveal delay={.12}><p className="heading-aside">Different hues, different stories.<br />One beautiful way to say it.</p></Reveal>
      </div>
      <div className="rose-grid">
        {roses.map((rose, i) => <Reveal key={rose.name} delay={i * .07} className={`rose-card card-${i + 1}`}>
          <div className="rose-image-wrap">
            <img src={rose.src} alt={rose.name} loading="lazy" />
            <span className="image-index">0{i + 1}</span>
            <span className="image-arrow"><ArrowUpRight size={18} /></span>
          </div>
          <div className="rose-card-copy"><div><h3>{rose.name}</h3><p>{rose.note}</p></div><span className="rose-meaning">{rose.meaning}</span></div>
        </Reveal>)}
      </div>
    </section>

    <section className="quote-section">
      <PetalRain count={10} />
      <div className="quote-inner">
        <Reveal><span className="quote-mark">“</span><p>Some flowers bloom in gardens,<br />some bloom <em>in hearts.</em></p><span className="quote-rule" /><small>A THOUGHT TO KEEP</small></Reveal>
      </div>
      <span className="quote-side">THE LANGUAGE OF FLOWERS · VOL. I</span>
    </section>

    <section className="gallery-section section-pad" id="gallery">
      <div className="section-heading gallery-heading">
        <Reveal><div><p className="eyebrow dark">A CLOSER LOOK / 02</p><h2>Beauty lives in the <em>details.</em></h2></div></Reveal>
        <Reveal delay={.1}><p className="heading-aside dark-aside">An intimate study of texture,<br />light, and the art of unfolding.</p></Reveal>
      </div>
      <div className="gallery-grid">
        {gallery.map((item, i) => <Reveal key={item.title} delay={i * .06} className={`gallery-item ${item.cls}`}>
          <div className="gallery-image"><img src={item.src} alt={item.title} loading="lazy" /><span className="gallery-plus"><Plus size={18} /></span></div>
          <div className="gallery-meta"><span>{item.label}</span><h3>{item.title}</h3></div>
        </Reveal>)}
      </div>
    </section>

    <section className="wish-section" id="wish">
      <div className="wish-backdrop" />
      <div className="wish-content">
        <Reveal><p className="eyebrow">A MOMENT, JUST FOR YOU / 03</p><h2>Every heart deserves<br /><em>a little wonder.</em></h2><p className="wish-intro">Somewhere between a wish and a daydream,<br />there is a flower waiting to bloom.</p></Reveal>
        <Reveal delay={.15}><RoseBloom opened={opened} onClick={() => setOpened(!opened)} /></Reveal>
        <motion.p className="wish-reveal" initial={false} animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 12 }} transition={{ duration: .8 }}>
          May this rose carry all the beauty<br />I wish to give you.
        </motion.p>
        {!opened && <p className="wish-instruction">A ROSE IS A GIFT. LET THIS ONE BLOOM.</p>}
      </div>
      <span className="wish-side">WITH ALL THE SOFTEST THINGS</span>
    </section>

    <footer className="footer">
      <a className="footer-brand" href="#home" onClick={(e) => { e.preventDefault(); goTo('home'); }}>A Rose <em>for You</em><span>✳</span></a>
      <p>A digital garden, made of roses<br />and the things words cannot quite say.</p>
      <div className="footer-bottom"><span>© 2026 ROSE / ATELIER</span><span>MADE WITH <Heart size={11} fill="currentColor" /> & A LITTLE MAGIC</span><a href="#home" onClick={(e) => { e.preventDefault(); goTo('home'); }}>BACK TO TOP ↑</a></div>
    </footer>
  </main>;
}