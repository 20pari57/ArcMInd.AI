import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Hexagon, ArrowRight, ScanSearch, Brain, GitFork,
  Sparkles, Zap, Shield, Code2, Database,
  ChevronRight, Terminal, Layers, Bot,
} from 'lucide-react';

/* ───── Animated Counter ───── */
function Counter({ value, suffix = '' }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {value}{suffix}
    </motion.span>
  );
}

/* ───── Feature Card ───── */
function FeatureCard({ icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: '0 0 40px rgba(123,111,255,0.15)' }}
      style={{
        background: '#0b1530',
        border: '1px solid rgba(100,180,255,0.12)',
        borderRadius: 16,
        padding: 32,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(135deg, #00cfff 0%, #7b6fff 50%, #c44dff 100%)',
        opacity: 0.6,
      }} />
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: 'rgba(0,207,255,0.08)',
        border: '1px solid rgba(0,207,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
      }}>
        <Icon size={22} style={{ color: '#00cfff' }} />
      </div>
      <h3 style={{
        fontFamily: '"DM Sans", sans-serif', fontSize: 18, fontWeight: 600,
        color: '#eaf4ff', margin: '0 0 8px',
      }}>{title}</h3>
      <p style={{
        fontFamily: '"DM Sans", sans-serif', fontSize: 14,
        color: '#8aa8c8', margin: 0, lineHeight: 1.7,
      }}>{desc}</p>
    </motion.div>
  );
}

/* ───── Step Card ───── */
function StepCard({ num, title, desc, icon: Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      style={{
        display: 'flex', gap: 20, alignItems: 'flex-start',
        padding: '24px 0',
        borderBottom: '1px solid rgba(100,180,255,0.06)',
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
        background: 'linear-gradient(135deg, #00cfff 0%, #7b6fff 50%, #c44dff 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Space Mono", monospace', fontSize: 18, fontWeight: 700,
        color: '#04091a',
      }}>
        {num}
      </div>
      <div>
        <h4 style={{
          fontFamily: '"DM Sans", sans-serif', fontSize: 16, fontWeight: 600,
          color: '#eaf4ff', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon size={16} style={{ color: '#00cfff' }} /> {title}
        </h4>
        <p style={{
          fontFamily: '"DM Sans", sans-serif', fontSize: 14,
          color: '#8aa8c8', margin: 0, lineHeight: 1.6,
        }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════ */
/*                HOME PAGE                    */
/* ═══════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

  const features = [
    { icon: ScanSearch, title: 'Deep Code Scanning', desc: 'Recursively scan entire codebases — skip binaries, node_modules, and junk. Understand every file.' },
    { icon: Brain, title: 'AI-Powered Summaries', desc: 'Gemini-generated summaries for every file, function, and module. Instant understanding.' },
    { icon: GitFork, title: 'Dependency Graphs', desc: 'Auto-built interactive dependency graphs. See how every piece connects at a glance.' },
    { icon: Database, title: 'Persistent Memory', desc: 'Save project memory to disk. Your AI remembers your codebase across sessions.' },
    { icon: Bot, title: 'AI Handoff Prompts', desc: 'Auto-generate handoff prompts for ChatGPT, Gemini, or Claude. Onboard any AI instantly.' },
    { icon: Shield, title: 'Privacy First', desc: 'Runs 100% locally. Your code never leaves your machine. Self-hosted, self-controlled.' },
  ];

  return (
    <div style={{ background: '#04091a', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── Animated Dot Grid BG ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(0,207,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* ── Gradient orbs (ambient) ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', top: '10%', left: '15%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,207,255,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{ x: [0, -25, 20, 0], y: [0, 25, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', top: '30%', right: '10%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,77,255,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ═══════════ NAVBAR ═══════════ */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px',
          background: 'rgba(4,9,26,0.75)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(100,180,255,0.08)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Hexagon size={24} style={{ color: '#00cfff' }} />
          <span className="gradient-text" style={{
            fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: 18,
          }}>ArcMind AI</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Features', 'How It Works', 'Open Source'].map((label) => (
            <motion.a
              key={label}
              href={`#${label.toLowerCase().replace(/\s/g, '-')}`}
              whileHover={{ color: '#00cfff' }}
              style={{
                fontFamily: '"Space Mono", monospace', fontSize: 12,
                color: '#8aa8c8', textDecoration: 'none', letterSpacing: '0.5px',
                textTransform: 'uppercase', cursor: 'pointer',
                transition: 'color 0.2s',
              }}
            >{label}</motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05, filter: 'brightness(1.15)' }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/dashboard')}
          className="gradient-bg"
          style={{
            padding: '8px 20px', borderRadius: 8, border: 'none',
            color: '#04091a', fontFamily: '"DM Sans", sans-serif',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          Launch Dashboard <ArrowRight size={14} />
        </motion.button>
      </motion.nav>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale,
          position: 'relative', zIndex: 1,
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '120px 24px 80px',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 99,
            background: 'rgba(0,207,255,0.06)',
            border: '1px solid rgba(0,207,255,0.15)',
            marginBottom: 32,
          }}
        >
          <Sparkles size={14} style={{ color: '#00cfff' }} />
          <span style={{
            fontFamily: '"Space Mono", monospace', fontSize: 11,
            color: '#00cfff', letterSpacing: '1px', textTransform: 'uppercase',
          }}>AI-Powered Codebase Intelligence</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 900,
            margin: '0 0 24px',
            letterSpacing: '-1px',
          }}
        >
          <span style={{ color: '#eaf4ff' }}>TURN ANY CODEBASE</span>
          <br />
          <span style={{ color: '#eaf4ff' }}>INTO </span>
          <span className="gradient-text">PERSISTENT</span>
          <br />
          <span className="gradient-text">AI MEMORY</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 18,
            color: '#8aa8c8', maxWidth: 560, margin: '0 0 40px',
            lineHeight: 1.7,
          }}
        >
          ArcMind scans your project, generates AI summaries,
          builds dependency graphs, and creates handoff prompts
          for any AI assistant.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <motion.button
            whileHover={{ scale: 1.05, filter: 'brightness(1.15)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/dashboard')}
            className="gradient-bg"
            style={{
              padding: '14px 36px', borderRadius: 10, border: 'none',
              color: '#04091a', fontFamily: '"Space Mono", monospace',
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
              letterSpacing: '0.5px', textTransform: 'uppercase',
            }}
          >
            LAUNCH DASHBOARD <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'rgba(100,180,255,0.4)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.open('https://github.com/arcmind-ai', '_blank')}
            style={{
              padding: '14px 36px', borderRadius: 10,
              background: 'rgba(100,180,255,0.06)',
              border: '1px solid rgba(100,180,255,0.2)',
              color: '#eaf4ff', fontFamily: '"Space Mono", monospace',
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
              letterSpacing: '0.5px', textTransform: 'uppercase',
            }}
          >
            <Code2 size={16} /> VIEW SOURCE
          </motion.button>
        </motion.div>

        {/* Terminal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          style={{
            marginTop: 64, maxWidth: 700, width: '100%',
            background: '#020810',
            border: '1px solid rgba(100,180,255,0.12)',
            borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 0 60px rgba(0,207,255,0.08), 0 0 120px rgba(123,111,255,0.05)',
          }}
        >
          {/* Terminal Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px',
            borderBottom: '1px solid rgba(100,180,255,0.08)',
            background: 'rgba(11,21,48,0.5)',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff4d6a' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffb830' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ff9d' }} />
            <span style={{
              marginLeft: 8, fontFamily: '"Space Mono", monospace',
              fontSize: 11, color: '#3d5a7a',
            }}>arcmind — scan</span>
          </div>
          {/* Terminal Lines */}
          <div style={{ padding: '16px 20px' }}>
            {[
              { c: '#3d5a7a', t: '$ arcmind scan ./my-project' },
              { c: '#00cfff', t: '[SCAN] Scanning 247 files...' },
              { c: '#00cfff', t: '[SCAN] Skipping node_modules/ (12,847 files)' },
              { c: '#00ff9d', t: '[AI] Generating summaries with Gemini 2.0 Flash...' },
              { c: '#00ff9d', t: '[AI] 247/247 files analyzed ✓' },
              { c: '#c44dff', t: '[GRAPH] Building dependency graph: 64 nodes, 128 edges' },
              { c: '#00ff9d', t: '[MEMORY] Writing project_summary.md ✓' },
              { c: '#00ff9d', t: '[MEMORY] Writing handoff_prompt.txt ✓' },
              { c: '#00ff9d', t: '[DONE] Codebase memory generated in 17.2s' },
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.3 }}
                style={{
                  fontFamily: '"Space Mono", monospace', fontSize: 12,
                  color: line.c, lineHeight: 2,
                }}
              >{line.t}</motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ marginTop: 48, color: '#3d5a7a' }}
        >
          <ChevronRight size={24} style={{ transform: 'rotate(90deg)' }} />
        </motion.div>
      </motion.section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(100,180,255,0.08)',
        borderBottom: '1px solid rgba(100,180,255,0.08)',
        background: 'rgba(11,21,48,0.4)', backdropFilter: 'blur(10px)',
        padding: '40px 48px',
        display: 'flex', justifyContent: 'center', gap: 80,
        flexWrap: 'wrap',
      }}>
        {[
          { val: '10K+', label: 'Files Scanned' },
          { val: '50+', label: 'Projects Analyzed' },
          { val: '100%', label: 'Local & Private' },
          { val: '<20s', label: 'Avg Scan Time' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <div className="gradient-text" style={{
              fontFamily: '"Space Mono", monospace', fontSize: 32, fontWeight: 700,
            }}>{s.val}</div>
            <div style={{
              fontFamily: '"Space Mono", monospace', fontSize: 11,
              color: '#3d5a7a', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 4,
            }}>{s.label}</div>
          </motion.div>
        ))}
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" style={{
        position: 'relative', zIndex: 1,
        padding: '100px 48px', maxWidth: 1200, margin: '0 auto',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <h2 style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 40, fontWeight: 700,
            margin: '0 0 16px',
          }}>
            <span style={{ color: '#eaf4ff' }}>Everything You Need to </span>
            <span className="gradient-text">Understand Code</span>
          </h2>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 16,
            color: '#8aa8c8', maxWidth: 500, margin: '0 auto',
          }}>
            From scanning to AI analysis to persistent memory — all in one tool.
          </p>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20,
        }}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how-it-works" style={{
        position: 'relative', zIndex: 1,
        padding: '80px 48px', maxWidth: 800, margin: '0 auto',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 36, fontWeight: 700, margin: '0 0 12px' }}>
            <span className="gradient-text">How It Works</span>
          </h2>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 16, color: '#8aa8c8',
          }}>Three steps to persistent codebase intelligence.</p>
        </motion.div>

        <StepCard num="1" icon={Terminal} title="Point to Your Project"
          desc="Enter the path to any codebase. ArcMind recursively scans all files, filters junk, and maps the structure."
          delay={0} />
        <StepCard num="2" icon={Sparkles} title="AI Analyzes Everything"
          desc="Gemini generates intelligent summaries, extracts functions, identifies patterns, and builds a dependency graph."
          delay={0.1} />
        <StepCard num="3" icon={Database} title="Memory Is Saved"
          desc="Project summary, file summaries, dependency graph, and handoff prompt — all saved as portable memory files."
          delay={0.2} />
      </section>

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '100px 48px', textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: 700, margin: '0 auto',
            background: '#0b1530',
            border: '1px solid rgba(100,180,255,0.12)',
            borderRadius: 24, padding: '64px 48px',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: 'linear-gradient(135deg, #00cfff 0%, #7b6fff 50%, #c44dff 100%)',
          }} />
          <Hexagon size={40} style={{ color: '#00cfff', marginBottom: 20 }} />
          <h2 style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 32, fontWeight: 700, margin: '0 0 12px',
          }}>
            <span style={{ color: '#eaf4ff' }}>Ready to </span>
            <span className="gradient-text">Remember Everything?</span>
          </h2>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 16,
            color: '#8aa8c8', margin: '0 0 32px', lineHeight: 1.7,
          }}>
            Launch the dashboard and start scanning your first project in seconds.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, filter: 'brightness(1.15)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/dashboard')}
            className="gradient-bg"
            style={{
              padding: '14px 40px', borderRadius: 10, border: 'none',
              color: '#04091a', fontFamily: '"Space Mono", monospace',
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              letterSpacing: '0.5px', textTransform: 'uppercase',
            }}
          >
            LAUNCH DASHBOARD <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(100,180,255,0.08)',
        padding: '32px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Hexagon size={18} style={{ color: '#00cfff' }} />
          <span style={{
            fontFamily: '"Space Mono", monospace', fontSize: 13, color: '#3d5a7a',
          }}>ArcMind AI</span>
          <span style={{
            fontFamily: '"Space Mono", monospace', fontSize: 10, color: '#3d5a7a',
            padding: '2px 8px', borderRadius: 4,
            background: 'rgba(0,207,255,0.06)', border: '1px solid rgba(0,207,255,0.1)',
          }}>v0.1.0</span>
        </div>
        <span style={{
          fontFamily: '"Space Mono", monospace', fontSize: 11, color: '#3d5a7a',
        }}>Built with ♡ for developers who ship fast.</span>
      </footer>
    </div>
  );
}
