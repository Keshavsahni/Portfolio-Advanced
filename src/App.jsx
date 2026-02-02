import React, { useState, useEffect } from 'react';

const useIntersectionObserver = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useIntersectionObserver(); // For global triggers

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-effect py-4 shadow-lg' : 'bg-transparent py-6'}`} style={{
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 50,
      padding: scrolled ? '1rem 0' : '1.5rem 0',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }} onClick={closeMenu}>
          <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Keshav Sahni.</span>
        </a>

        {/* Desktop Menu */}
        <div className="nav-desktop" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontWeight: 500, fontSize: '0.9rem' }} className="hover-lift">{item}</a>
          ))}
          <a href="/Keshav-Sahni-resume.pdf" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent)' }} className="hover-lift">Resume</a>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          style={{ display: 'none', zIndex: 101, color: 'var(--text-primary)' }}
          className="mobile-hamburger"
          aria-label="Toggle menu"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu} style={{ fontSize: '1.5rem', fontWeight: 700 }}>{item}</a>
          ))}
          <a href="/Keshav-Sahni-resume.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMenu} style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>Resume</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
    <div className="container">
      <div className="fade-in">
        <p style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Welcome to my portfolio</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 800, marginBottom: '1.5rem' }}>
          Building Digital <br />
          <span style={{ color: 'var(--accent)' }}>Experiences</span>
        </h1>
        <p style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          I enjoy building real-world projects using data science and full-stack technologies.
          I focus on writing clean, efficient code and solving meaningful problems.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#projects" className="hover-lift" style={{ background: 'var(--accent)', color: 'var(--bg-primary)', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 600 }}>View Work</a>
          <a href="#contact" className="hover-lift" style={{ border: '1px solid var(--accent)', color: 'var(--accent)', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 600 }}>Get In Touch</a>
          <a href="/Keshav-Sahni-resume.pdf" target="_blank" rel="noopener noreferrer" className="hover-lift" style={{ border: '1px solid var(--text-secondary)', color: 'var(--text-secondary)', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 600 }}>Resume</a>
        </div>
      </div>
    </div>
  </section>
);

const SectionHeading = ({ children }) => (
  <div className="reveal reveal-up" style={{ marginBottom: '4rem' }}>
    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{children}</h2>
    <div style={{ width: '50px', height: '4px', background: 'var(--accent)', borderRadius: '2px' }}></div>
  </div>
);

const About = () => (
  <section id="about" className="section">
    <div className="container">
      <SectionHeading>About Me</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div className="reveal reveal-left">
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            I'm a BCA student and aspiring Data Analyst / Frontend Developer with hands-on experience in Python, Data Analysis, and modern web technologies. I enjoy transforming raw data into meaningful insights and building clean, user-focused applications that solve real-world problems.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            I've worked on multiple end-to-end projects involving EDA, data visualization, machine learning basics, and Generative AI, as well as full-stack web applications using React, Node.js, MongoDB, and MySQL. My projects focus on practical use cases like job-skill matching, student performance analysis, fitness and workout generation systems, LMS platforms, and AI-powered assistants.
          </p>
        </div>
        <div className="reveal reveal-right" style={{ position: 'relative' }}>
          <div className="float-animation" style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <img src="/profile.jpeg" alt="Keshav Sahni" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', top: '20px', left: '20px', width: '100%', height: '100%', border: '2px solid var(--accent)', borderRadius: '12px', zIndex: -1 }}></div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const skills = [
    { name: 'SQL', level: '90%' },
    { name: 'Python', level: '85%' },
    { name: 'EDA', level: '95%' },
    { name: 'Machine Learning', level: '75%' },
    { name: 'Gen-AI', level: '90%' },
    { name: 'Git', level: '80%' }
  ];

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeading>My Skills</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {skills.map((skill, index) => (
            <div key={skill.name} className="glass-effect reveal reveal-up hover-lift" style={{ padding: '2rem', borderRadius: '12px', textAlign: 'center', transitionDelay: `${index * 0.1}s` }}>
              <h3 style={{ marginBottom: '1rem' }}>{skill.name}</h3>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: skill.level, height: '100%', background: 'var(--accent)' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'JobFit-Analyzer',
      desc: 'An AI-powered system for job-skill matching using NLP.',
      category: 'Data Science / Gen-AI',
      github: 'https://github.com/Keshavsahni/JobFit-Analyzer',
      live: 'https://jobfit-analyzer-jzghxj34spmjannrhrf4dv.streamlit.app/'
    },
    {
      title: 'JARVIS-Voice-AI',
      desc: 'Full-stack workout generation and tracking system.',
      category: 'Gen-AI / Voice Module',
      github: 'https://github.com/Keshavsahni/JARVIS-Voice-AI',
      // live: '#'
    },
    {
      title: 'Health-NGO-countryData-Clustering',
      desc: 'Clusters countries using health and socio-economic data.',
      category: 'Machine-Learning / Streamlit',
      github: 'https://github.com/Keshavsahni/Health-NGO-countryData-Clustering',
      live: 'https://health-ngo-countrydata-clustering-aa9buza8xkxwqwkj8kzbkm.streamlit.app/'
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading>Featured Projects</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {projects.map((project, index) => (
            <div key={index} className="reveal reveal-up hover-lift" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-secondary)', aspectRatio: '16/10', transitionDelay: `${index * 0.1}s`, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <p style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>{project.category}</p>
                <h3 style={{ margin: '0.5rem 0' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{project.desc}</p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', fontWeight: 600, borderBottom: '1px solid var(--accent)', paddingBottom: '2px' }}>GitHub</a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', fontWeight: 600, borderBottom: '1px solid var(--accent)', paddingBottom: '2px' }}>Live Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
    <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
      <SectionHeading>Get In Touch</SectionHeading>
      <div className="reveal reveal-up">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>
          Currently looking for new opportunities. Whether you have a question or just want to say hi, I’ll get back to you!
        </p>
        <a href="mailto:keshavsahni01@gmail.com" className="hover-lift" style={{ background: 'var(--accent)', color: 'var(--bg-primary)', padding: '1.2rem 3rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.1rem', display: 'inline-block' }}>Say Hello</a>
        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-secondary)' }}>
          <a href="https://www.linkedin.com/in/keshav-sahni-53bb20193/" className="hover-lift">LinkedIn</a>
          <a href="https://github.com/Keshavsahni" className="hover-lift">GitHub</a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
    <div className="container">
      <p>© {new Date().getFullYear()} Keshav Sahni. Designed with minimalism in mind.</p>
    </div>
  </footer>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
