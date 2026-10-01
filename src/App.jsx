import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import TextEditor from './components/TextEditor';
import Toolbar from './components/Toolbar';
import StatsGrid from './components/StatsGrid';
import ScriptBreakdown from './components/ScriptBreakdown';
import CharacterLimit from './components/CharacterLimit';
import KeywordDensity from './components/KeywordDensity';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import MobileStickyBar from './components/MobileStickyBar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTextStats } from './hooks/useTextStats';
import { SAMPLE_MIXED_TEXT } from './utils/sampleText';

export default function App() {
  // Theme state: defaults to system preference if not set
  const [theme, setTheme] = useLocalStorage('wordcounter_theme', () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const isDark = theme === 'dark';

  // Apply dark class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Persistent Text & Editor Settings with 500ms debounce auto-save
  const [text, setText, isSaved] = useLocalStorage('wordcounter_text', '', 500);
  const [directionMode, setDirectionMode] = useLocalStorage('wordcounter_dir_mode', 'auto');
  const [fontSize, setFontSize] = useLocalStorage('wordcounter_font_size', 'medium');
  const [selectedPresetId, setSelectedPresetId] = useLocalStorage('wordcounter_preset', 'twitter');
  const [customLimit, setCustomLimit] = useLocalStorage('wordcounter_custom_limit', 500);

  // Keyword Density options state
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);
  const [minEnglishLength, setMinEnglishLength] = useState(3);
  const [minUrduLength, setMinUrduLength] = useState(2);

  // Modal & Toast states
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [toast, setToast] = useState(null); // { message, type, actionLabel, onAction }
  const lastClearedTextRef = useRef('');

  // Calculate live statistics with language awareness
  const stats = useTextStats(text, {
    ignoreStopWords,
    minEnglishLength,
    minUrduLength,
    limit: 10
  });

  // Toast trigger helper
  const showToast = (message, type = 'info', actionLabel = null, onAction = null) => {
    setToast({ message, type, actionLabel, onAction });
  };

  // Load sample text
  const handleLoadSample = () => {
    setText(SAMPLE_MIXED_TEXT);
    showToast('Loaded sample English and Urdu paragraphs!', 'success');
  };

  // Clear text with 5-second undo support
  const handleConfirmClear = () => {
    lastClearedTextRef.current = text;
    setText('');
    setIsClearModalOpen(false);

    showToast(
      'Text cleared! (متن صاف کر دیا گیا)',
      'info',
      'Undo',
      () => {
        setText(lastClearedTextRef.current);
        showToast('Text restored! (متن بحال کر دیا گیا)', 'success');
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 overflow-x-hidden">
      {/* Header Bar */}
      <Header
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        isSaved={isSaved}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 pb-28 lg:pb-12 space-y-4 sm:space-y-6 overflow-x-hidden">
        {/* Top Split Layout: Editor on Left (60%), Stats on Right (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Left Column (Editor & Toolbar ~60%) */}
          <section className="lg:col-span-7 flex flex-col gap-3 sm:gap-4 min-w-0">
            <TextEditor
              value={text}
              onChange={setText}
              directionMode={directionMode}
              onChangeDirectionMode={setDirectionMode}
              detectedDirection={stats.detectedDirection}
              fontSize={fontSize}
              onChangeFontSize={setFontSize}
              onLoadSample={handleLoadSample}
            />

            <Toolbar
              text={text}
              onUpdateText={setText}
              onOpenClearDialog={() => setIsClearModalOpen(true)}
              onShowToast={showToast}
              stats={stats}
            />
          </section>

          {/* Right Column (Stats Grid & Script Breakdown ~40%) */}
          <aside className="lg:col-span-5 flex flex-col gap-3 sm:gap-4 min-w-0">
            <StatsGrid stats={stats} />
            <ScriptBreakdown breakdown={stats.scriptBreakdown} />
          </aside>
        </div>

        {/* Collapsible Lower Panels: Character Limit & Keyword Density */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Character Limit Presets */}
          <div className="lg:col-span-5 min-w-0">
            <CharacterLimit
              currentCount={stats.charactersWithSpaces}
              selectedPresetId={selectedPresetId}
              onSelectPresetId={setSelectedPresetId}
              customLimit={customLimit}
              onChangeCustomLimit={setCustomLimit}
            />
          </div>

          {/* Keyword Density Analysis */}
          <div className="lg:col-span-7 min-w-0">
            <KeywordDensity
              keywords={stats.keywords}
              ignoreStopWords={ignoreStopWords}
              onToggleIgnoreStopWords={() => setIgnoreStopWords((prev) => !prev)}
              minEnglishLength={minEnglishLength}
              onChangeMinEnglishLength={setMinEnglishLength}
              minUrduLength={minUrduLength}
              onChangeMinUrduLength={setMinUrduLength}
              onShowToast={showToast}
            />
          </div>
        </section>
      </main>

      {/* Mobile Sticky Bar for quick stats */}
      <MobileStickyBar
        words={stats.words}
        characters={stats.charactersWithSpaces}
        readingTime={stats.readingTimeText}
      />

      {/* Clear Text Confirmation Modal */}
      <ConfirmDialog
        isOpen={isClearModalOpen}
        title="Clear All Text?"
        message="Are you sure you want to remove all text from the editor? This action cannot be undone after the notification expires."
        confirmLabel="Clear Text"
        cancelLabel="Keep Text"
        onConfirm={handleConfirmClear}
        onCancel={() => setIsClearModalOpen(false)}
      />

      {/* Floating Toast Notification with Undo */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          actionLabel={toast.actionLabel}
          onAction={toast.onAction}
          onClose={() => setToast(null)}
          duration={5000}
        />
      )}
    </div>
  );
}
