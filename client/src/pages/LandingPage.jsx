import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, ChevronRight, FileCode2, Network, ScanSearch, Share2 } from 'lucide-react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.landingPage}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <BrainCircuit className={styles.logoIcon} size={28} />
          <span>ArcMind</span>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
          Dashboard
        </button>
      </nav>

      <main>
        {/* Section 1: Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              AI That Understands<br />
              Your <span className="glow-text">Entire Codebase</span>
            </h1>
            <p className={styles.subtitle}>
              ArcMind builds a living memory of your project, so any AI can understand, extend, and ship faster.
            </p>
            <div className={styles.actions}>
              <button className="btn-primary" onClick={() => navigate('/dashboard')}>
                Start Scanning Now <ChevronRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
                View Dashboard
              </button>
            </div>
          </div>
        </section>

        {/* Section 5: Features Grid */}
        <section className={styles.featuresGrid}>
          <FeatureCard 
            icon={<ScanSearch />}
            title="AI Code Scan"
            description="Deep scan your entire codebase and understand every part."
          />
          <FeatureCard 
            icon={<Network />}
            title="Memory Graph"
            description="Visualize relationships between files, functions, and modules."
          />
          <FeatureCard 
            icon={<FileCode2 />}
            title="Smart Summary"
            description="Get AI-generated summaries of your project structure."
          />
          <FeatureCard 
            icon={<BrainCircuit />}
            title="AI Handoff"
            description="Export rich context and handoff to any AI tool seamlessly."
          />
          <FeatureCard 
            icon={<Share2 />}
            title="Export & Share"
            description="Export memory, share with team, and keep everyone aligned."
          />
        </section>

        {/* Section 2: Project Scan Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Step 1</span>
            <h2 className={styles.sectionTitle}>Scan Your Project with AI</h2>
            <p className={styles.subtitle} style={{marginBottom: 0}}>
              ArcMind reads your entire codebase, understands every file, and builds a deep semantic index.
            </p>
          </div>
          <div className={styles.sectionContent}>
             <div style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
                  <li>✓ Parsing source code</li>
                  <li>✓ Analyzing dependencies</li>
                  <li>✓ Building AI memory graph</li>
                  <li>✓ Generating smart summary</li>
                </ul>
             </div>
             <div className="glass-card" style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Scanning Progress</span>
                  <span className="glow-text">76%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '76%', height: '100%', background: 'var(--primary)' }}></div>
                </div>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className={styles.featureCard}>
    <div className={styles.featureIcon}>{icon}</div>
    <h3 className={styles.featureTitle}>{title}</h3>
    <p className={styles.featureDesc}>{description}</p>
  </div>
);

export default LandingPage;
