import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Key, Cpu, Wifi, Trash2, Save, X, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../store/useStore';
import { checkHealth } from '../api/arcmind';

export default function Settings() {
  const { settings, updateSettings, setOnline, setLatency } = useStore();
  const [localSettings, setLocalSettings] = useState({ ...settings });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);

  const update = (key, val) => setLocalSettings((s) => ({ ...s, [key]: val }));

  const handleSave = () => {
    updateSettings(localSettings);
    toast.success('Settings saved', {
      style: { background: '#0b1530', color: '#00ff9d', border: '1px solid rgba(0,255,157,0.25)', fontFamily: '"Space Mono", monospace', fontSize: 12 },
    });
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const start = Date.now();
    try {
      await checkHealth();
      const ms = Date.now() - start;
      setTestResult({ ok: true, ms });
      setOnline(true);
      setLatency(ms);
      toast.success(`Connected (${ms}ms)`, {
        style: { background: '#0b1530', color: '#00ff9d', border: '1px solid rgba(0,255,157,0.25)', fontFamily: '"Space Mono", monospace', fontSize: 12 },
      });
    } catch {
      setTestResult({ ok: false, ms: null });
      setOnline(false);
      toast.error('Connection failed', {
        style: { background: '#0b1530', color: '#ff4d6a', border: '1px solid rgba(255,77,106,0.25)', fontFamily: '"Space Mono", monospace', fontSize: 12 },
      });
    } finally {
      setTesting(false);
    }
  };

  const handleClearMemory = () => {
    localStorage.removeItem('arcmind-settings');
    updateSettings({ apiUrl: 'http://127.0.0.1:8000', apiKey: '', model: 'gemini-2.0-flash' });
    setLocalSettings({ apiUrl: 'http://127.0.0.1:8000', apiKey: '', model: 'gemini-2.0-flash' });
    setShowClearModal(false);
    toast.success('Memory cleared', {
      style: { background: '#0b1530', color: '#00ff9d', border: '1px solid rgba(0,255,157,0.25)', fontFamily: '"Space Mono", monospace', fontSize: 12 },
    });
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', background: '#04091a',
    border: '1px solid rgba(100,180,255,0.12)', borderRadius: 8,
    color: '#eaf4ff', fontFamily: '"Space Mono", monospace', fontSize: 13, outline: 'none',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Backend URL */}
        <Section icon={Server} title="Backend URL">
          <input id="settings-api-url" style={inputStyle} value={localSettings.apiUrl}
            onChange={(e) => update('apiUrl', e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#00cfff'; e.target.style.boxShadow = '0 0 15px rgba(0,207,255,0.15)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(100,180,255,0.12)'; e.target.style.boxShadow = 'none'; }}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} onClick={handleTest}
              disabled={testing}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8,
                background: 'rgba(0,207,255,0.08)', border: '1px solid rgba(0,207,255,0.2)',
                color: '#00cfff', fontFamily: '"Space Mono", monospace', fontSize: 12, cursor: 'pointer',
              }}>
              <Wifi size={14} />
              {testing ? 'Testing...' : 'Test Connection'}
            </motion.button>
            {testResult && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ display: 'flex', alignItems: 'center', fontFamily: '"Space Mono", monospace', fontSize: 12,
                  color: testResult.ok ? '#00ff9d' : '#ff4d6a' }}>
                {testResult.ok ? `✓ Connected (${testResult.ms}ms)` : '✕ Failed'}
              </motion.span>
            )}
          </div>
        </Section>

        {/* API Key */}
        <Section icon={Key} title="API Key">
          <input id="settings-api-key" type="password" style={inputStyle} value={localSettings.apiKey}
            placeholder="Enter your Gemini API key"
            onChange={(e) => update('apiKey', e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#00cfff'; e.target.style.boxShadow = '0 0 15px rgba(0,207,255,0.15)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(100,180,255,0.12)'; e.target.style.boxShadow = 'none'; }}
          />
        </Section>

        {/* Model Selector */}
        <Section icon={Cpu} title="AI Model">
          <select id="settings-model" style={{ ...inputStyle, cursor: 'pointer' }}
            value={localSettings.model} onChange={(e) => update('model', e.target.value)}>
            <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
            <option value="gemini-2.0-pro">Gemini 2.0 Pro</option>
            <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
          </select>
        </Section>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <motion.button whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }} whileTap={{ scale: 0.96 }}
            onClick={handleSave} className="gradient-bg"
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 8,
              border: 'none', color: '#04091a', fontFamily: '"DM Sans", sans-serif',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>
            <Save size={16} /> Save Settings
          </motion.button>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
            onClick={() => setShowClearModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8,
              background: 'rgba(255,77,106,0.08)', border: '1px solid rgba(255,77,106,0.25)',
              color: '#ff4d6a', fontFamily: '"DM Sans", sans-serif', fontSize: 13, cursor: 'pointer',
            }}>
            <Trash2 size={14} /> Clear Memory
          </motion.button>
        </div>
      </div>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showClearModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,26,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
            onClick={() => setShowClearModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#0b1530', border: '1px solid rgba(255,77,106,0.25)', borderRadius: 16, padding: 32, maxWidth: 400, width: '90%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <AlertTriangle size={24} style={{ color: '#ff4d6a' }} />
                <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 18, fontWeight: 600, color: '#eaf4ff', margin: 0 }}>Clear All Memory?</h3>
              </div>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 14, color: '#8aa8c8', margin: '0 0 24px', lineHeight: 1.6 }}>
                This will reset all settings to defaults and clear stored data. This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => setShowClearModal(false)}
                  style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(100,180,255,0.06)', border: '1px solid rgba(100,180,255,0.12)', color: '#8aa8c8', fontFamily: '"DM Sans", sans-serif', fontSize: 13, cursor: 'pointer' }}>
                  Cancel
                </motion.button>
                <motion.button whileTap={{ scale: 0.96 }} onClick={handleClearMemory}
                  style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(255,77,106,0.15)', border: '1px solid rgba(255,77,106,0.35)', color: '#ff4d6a', fontFamily: '"DM Sans", sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Clear Everything
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <div style={{ background: '#0b1530', border: '1px solid rgba(100,180,255,0.12)', borderRadius: 12, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Icon size={18} style={{ color: '#00cfff' }} />
        <h3 className="gradient-text" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 14, fontWeight: 600, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}
