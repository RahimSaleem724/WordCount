# Word & Character Counter (الفاظ اور حروف شمار کنندہ)

> A fast, clean, modern, and mobile-friendly Word & Character Counter web application built with **React**, **Vite**, and **Tailwind CSS**. Designed specifically with first-class support for both English (LTR) and Urdu (RTL) typography and linguistic rules. Works completely client-side in the browser with zero backend dependencies.

---

## 🌟 Overview & Screenshots

The **Word & Character Counter** is a high-performance text analysis tool suitable for writers, journalists, students, copywriters, and developers working with multilingual English and Urdu content.

### Application Preview

```
+-----------------------------------------------------------------------------------------+
| [T] Word & Character Counter  [Alfaz Ginti]           (Saved / محفوظ)    [🌙 Theme]     |
|     الفاظ اور حروف شمار کنندہ                                                            |
+------------------------------------------------------------+----------------------------+
|  [Direction: Auto (LTR/RTL)]  [Size: S M L]  [✨ Try sample]|  📊 LIVE STATISTICS        |
| +--------------------------------------------------------+ | +------------+------------+|
| | Yahan apna text likhein ya paste karein...             | | | Words      | Chars (all)||
| | Type or paste your text here...                        | | | 76         | 375        ||
| |                                                        | | +------------+------------+|
| | اردو ایک شیریں اور خوبصورت زبان ہے...                  | | | Sentences  | Paragraphs ||
| |                                                        | | | 4          | 1          ||
| +--------------------------------------------------------+ | +------------+------------+|
|  [Copy] [Paste] [Upload .txt] [Clear] | [Copy Stats] [.CSV]| | Reading: <1 min | Spech  ||
|  Cleanup: [Extra Spaces] [Empty Lines] [Trim] [UPPER]      | +--------------------------+|
|                                                            | 🌐 Script Breakdown: 100% UR|
+------------------------------------------------------------+----------------------------+
| 🎯 Character Limit Presets: [Twitter] [SMS] [Instagram] [Meta] [SEO] [WhatsApp] [Custom] |
| 🔑 Keyword Density Analysis: Top 10 Words, Stop Word Filters (EN + UR), Length Filtering |
+-----------------------------------------------------------------------------------------+
```

---

## 🚀 Key Features

### 1. Language-Aware NLP & Counting Engine
- **Intl.Segmenter Integration**: Native Unicode word boundary segmentation conforming to Unicode Standard Annex #29, with automatic regex fallbacks.
- **Urdu Script & Diacritics**: Accurately counts combined graphemes with Urdu diacritics / harakaat (*zabar, zer, pesh, tashdeed*) as single characters rather than multiple code points.
- **Zero-Width Non-Joiner (ZWNJ \u200C)**: Preserves Urdu compound words (e.g. `بے‌شک`) without splitting words, and excludes non-visible joiners from visible character count.
- **Numerals**: Word-like token recognition for both Western Arabic numerals (`0-9`) and Eastern Arabic/Urdu numerals (`۰۱۲۳۴۵۶۷۸۹`).
- **Compound Tokens**: Correctly preserves contractions (`don't`), hyphenated words (`well-known`), URLs (`https://...`), and email addresses as single word units.

### 2. Live Statistics (11 Real-Time Metrics)
1. **Words**: Language-aware word count.
2. **Characters (with spaces)**: Full grapheme count including spaces.
3. **Characters (without spaces)**: Visible characters excluding all whitespace.
4. **Sentences**: Boundary detection splitting on `.`, `!`, `?`, `۔` (Urdu full stop), and `؟` (Urdu question mark), cleanly handling multiple consecutive punctuation (e.g., `Really?!`).
5. **Paragraphs**: Blocks separated by one or more blank lines.
6. **Lines**: Total line count.
7. **Unique Words**: Case-insensitive unique vocabulary count with diversity percentage.
8. **Average Word Length**: Mean characters per word calculated to 1 decimal place.
9. **Longest Word**: Displays the longest word with its character count.
10. **Reading Time**: Calculated based on script speed (English: 200 WPM, Urdu: 150 WPM, mixed: dominant script), formatted as `less than a minute` or `X min Y sec`.
11. **Speaking Time**: Speech delivery rate at 130 WPM.

### 3. Script Composition Breakdown
- Computes percentage and character count breakdown across:
  - **Urdu / Arabic** script
  - **Latin / English** script
  - **Digits** (English & Urdu digits)
  - **Other** (punctuation, symbols, emojis)
- Visual multi-color stacked progress bar.

### 4. Text Editor & Urdu Typography
- **Bi-directional Auto Detection**: Detects first strong directional character and applies `dir="rtl"` / `dir="ltr"` automatically.
- **Manual Direction Override**: Auto, LTR, or RTL toggle button.
- **Urdu Nastaliq Font**: Integrates Google Font **Noto Nastaliq Urdu** with generous line-height (`leading-[2.2]`) ensuring ligatures and diacritics do not clip.
- **Font Sizing**: Quick toggles for Small (14px), Medium (16px), and Large (18px/20px).
- **Plain Text Paste**: Intercepts clipboard paste to ensure clean text without rich HTML formatting.
- **Sample Paragraphs**: 1-click sample button that loads authentic English and Urdu text.

### 5. Character Limit Presets
- Pre-configured presets for popular publishing channels:
  - **Twitter / X**: 280 characters
  - **SMS**: 160 characters
  - **Meta Description**: 160 characters
  - **SEO Title**: 60 characters
  - **Instagram Caption**: 2,200 characters
  - **Facebook Post**: 63,206 characters
  - **WhatsApp Status**: 700 characters
  - **YouTube Title**: 100 characters
  - **Custom Limit**: User enters any custom threshold.
- Responsive color-coded progress bar:
  - 🟢 **Green**: Under 80% of limit
  - 🟡 **Yellow**: 80% to 100% of limit
  - 🔴 **Red**: Over 100% (shows `-X characters over`)

### 6. Keyword Density Analysis
- Top 10 most frequent words with occurrence counts, density percentages, and visual bars.
- **Stop Words Filtering**: Filter common English words (*the, is, and, to, of...*) and common Urdu words (*کا، کی، کے، ہے، ہیں، میں، سے، کو، اور، پر، نے، یہ، وہ...*).
- **Word Length Filtering**: Configurable minimum length filter (default: 3 chars for English, 2 chars for Urdu).
- **Export Keyword Table**: 1-click copy formatted table as plain text to clipboard.

### 7. Actions & Text Cleanup Tools
- **Clipboard**: Copy text, Paste text, Copy summary report.
- **File Upload**: Upload `.txt` files up to 2MB via HTML5 FileReader.
- **Reports**: Download analysis reports in `.txt` format and `.csv` format.
- **Text Cleanup Utilities**:
  - Remove extra consecutive horizontal spaces
  - Remove empty lines
  - Trim lines (leading and trailing whitespace)
  - UPPERCASE (applies to Latin letters, preserves Urdu)
  - lowercase (applies to Latin letters, preserves Urdu)
  - Title Case (capitalizes initial letters of Latin words, preserves Urdu)
- **Safe Clear & Undo**: Confirmation modal dialog with 5-second floating Toast to undo accidental clearing.

### 8. Local Persistence & Dark Mode
- Automatically saves text, selected preset, font size, direction mode, and theme to `localStorage` with a 500ms debounce.
- Subtle "Saved / محفوظ" status badge.
- Dark and Light modes with automatic `prefers-color-scheme` detection.
- Mobile sticky bottom bar displaying real-time Words & Characters.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (Vite 8)
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Fonts**: Noto Nastaliq Urdu & Inter (Google Fonts)
- **Testing**: Vitest & React Testing Library (36 unit tests)
- **Execution**: 100% client-side (no server or backend API calls)

---

## 📁 Project Structure

```
WordCounter/
├── index.html                  # HTML entry with Google Fonts & meta tags
├── vite.config.js              # Vite configuration with Vitest setup
├── tailwind.config.js          # Tailwind styling configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Project dependencies and test scripts
├── src/
│   ├── assets/                 # SVGs and static assets
│   ├── components/
│   │   ├── Header.jsx          # Header with branding, Urdu subtitle, Roman Urdu tooltips
│   │   ├── ThemeToggle.jsx     # Dark/light mode switcher
│   │   ├── TextEditor.jsx      # Resizable editor, direction toggle, font sizing
│   │   ├── Toolbar.jsx         # Copy, paste, clear, upload, exports, cleanup tools
│   │   ├── StatsGrid.jsx       # 11 live statistics cards in responsive grid
│   │   ├── StatCard.jsx        # Animated individual stat card with ARIA live region
│   │   ├── ScriptBreakdown.jsx # Urdu vs Latin vs Digits vs Other breakdown
│   │   ├── CharacterLimit.jsx  # Preset chips, custom limit, color-coded progress
│   │   ├── KeywordDensity.jsx  # Top 10 frequency table, stop words filter, copy
│   │   ├── ConfirmDialog.jsx   # Accessible modal dialog for clear confirmation
│   │   ├── Toast.jsx           # Floating notification with 5-second Undo action
│   │   └── MobileStickyBar.jsx # Sticky bottom bar on mobile viewports
│   ├── hooks/
│   │   ├── useDebounce.js      # Debounce utility hook
│   │   ├── useLocalStorage.js  # Persistent state with try/catch and 500ms debounce
│   │   └── useTextStats.js     # Memoized statistics calculator (100ms debounce >50k chars)
│   ├── utils/
│   │   ├── countWords.js       # Intl.Segmenter word counting, URLs/emails/hyphens/ZWNJ
│   │   ├── countCharacters.js  # Grapheme counting, emojis, Urdu diacritics
│   │   ├── countSentences.js   # Sentence splitting (. ! ? ۔ ؟)
│   │   ├── detectDirection.js  # First strong character detection
│   │   ├── scriptBreakdown.js  # Script composition percentage calculation
│   │   ├── readingTime.js      # Reading and speaking speed calculation
│   │   ├── keywordDensity.js   # Frequency table and stop word filtering
│   │   ├── textCleanup.js      # Whitespace and safe casing tools
│   │   ├── exportReport.js     # Plain text & CSV report download
│   │   ├── stopwords.js        # English and Urdu stop words database
│   │   └── sampleText.js       # Curated sample texts in English and Urdu
│   ├── tests/
│   │   ├── countWords.test.js
│   │   ├── countCharacters.test.js
│   │   ├── countSentences.test.js
│   │   ├── detectDirection.test.js
│   │   ├── readingTime.test.js
│   │   └── keywordDensity.test.js
│   ├── App.jsx                 # Application layout, state wiring, collapsible panels
│   ├── main.jsx                # React root mount
│   └── index.css               # Tailwind directives and Urdu typography rules
```

---

## 🏃 Getting Started

### Prerequisites
- **Node.js** (v18.0 or later recommended; tested on Node v22)
- **npm** (v9 or later)

### Installation
```bash
# Navigate to the project directory
cd WordCounter

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Run Unit Tests
```bash
# Run Vitest test suite
npm run test

# Run Vitest in interactive watch mode
npm run test:watch
```

### Production Build
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 🔮 Future Improvements

1. **Document Import (.docx, .pdf, .rtf)**: Add client-side parsing for Microsoft Word documents (`mammoth.js`) and PDF files (`pdfjs-dist`) directly in the browser.
2. **PWA (Progressive Web App) Offline Support**: Add service worker caching and Web App Manifest for complete offline desktop and mobile installation.
3. **Shareable URL Links**: Compress and encode text into URL hash parameters (e.g. using `lz-string`) to allow sharing text snippets and counts directly via link.
4. **Readability Scoring**: Implement multilingual readability indices (Flesch-Kincaid for English, and custom syllable-based readability formulas for Urdu prose).
5. **Urdu Diacritic Stripper**: An additional cleanup button to optionally strip all harakaat (zabar, zer, pesh) for search-engine optimization.

---

## 📄 License
MIT License. Open for educational and portfolio use.
