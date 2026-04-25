import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

const typeIcons = {
  summary: '📋',
  summaries: '📄',
  graph: '🔗',
  prompt: '🤖',
};

export default function MemoryCard({ file, delay = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([file.content || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="gradient-border"
      style={{
        background: '#0b1530',
        border: '1px solid rgba(100,180,255,0.12)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>{typeIcons[file.type] || '📄'}</span>
          <div>
            <div
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 13,
                color: '#eaf4ff',
              }}
            >
              {file.name}
            </div>
            <div
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 12,
                color: '#3d5a7a',
                marginTop: 2,
              }}
            >
              {file.description}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 11,
              color: '#3d5a7a',
            }}
          >
            {file.size}
          </span>
          {isOpen ? (
            <ChevronUp size={16} style={{ color: '#8aa8c8' }} />
          ) : (
            <ChevronDown size={16} style={{ color: '#8aa8c8' }} />
          )}
        </div>
      </div>

      {/* Content Viewer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ borderTop: '1px solid rgba(100,180,255,0.08)' }}>
              {/* Actions */}
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  padding: '10px 20px',
                  borderBottom: '1px solid rgba(100,180,255,0.08)',
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 12px',
                    borderRadius: 6,
                    background: 'rgba(0, 207, 255, 0.08)',
                    border: '1px solid rgba(0, 207, 255, 0.2)',
                    color: '#00cfff',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 12px',
                    borderRadius: 6,
                    background: 'rgba(196, 77, 255, 0.08)',
                    border: '1px solid rgba(196, 77, 255, 0.2)',
                    color: '#c44dff',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  <Download size={12} />
                  Download
                </motion.button>
              </div>

              {/* Code Content */}
              <pre
                style={{
                  padding: 20,
                  margin: 0,
                  background: '#020810',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 12,
                  color: '#8aa8c8',
                  lineHeight: 1.7,
                  overflowX: 'auto',
                  maxHeight: 300,
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {file.content || 'No content available.'}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
