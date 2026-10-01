import { useRef } from 'react';
import {
  Copy,
  ClipboardPaste,
  Trash2,
  Upload,
  Download,
  FileSpreadsheet,
  FileText,
  Scissors,
  Space,
  Minimize2
} from 'lucide-react';
import {
  removeExtraSpaces,
  removeEmptyLines,
  trimLines,
  toUpperCase,
  toLowerCase,
  toTitleCase
} from '../utils/textCleanup';
import { generateTextReport, generateCsvReport, downloadFile } from '../utils/exportReport';

/**
 * Text Editor Toolbar with Actions, File Upload/Download, and Text Cleanup Tools.
 * Fully mobile responsive.
 *
 * @param {{
 *   text: string,
 *   onUpdateText: (newText: string) => void,
 *   onOpenClearDialog: () => void,
 *   onShowToast: (msg: string, type?: string, actionLabel?: string, onAction?: () => void) => void,
 *   stats: Object
 * }} props
 */
export default function Toolbar({
  text,
  onUpdateText,
  onOpenClearDialog,
  onShowToast,
  stats
}) {
  const fileInputRef = useRef(null);

  // Copy text to clipboard
  const handleCopyText = async () => {
    if (!text) {
      onShowToast('Textarea is empty', 'info');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      onShowToast('Text copied to clipboard! (کاپی ہو گیا)', 'success');
    } catch {
      onShowToast('Failed to copy text', 'error');
    }
  };

  // Paste text from clipboard
  const handlePasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (!clipboardText) {
        onShowToast('Clipboard is empty', 'info');
        return;
      }
      onUpdateText(clipboardText);
      onShowToast('Text pasted from clipboard!', 'success');
    } catch {
      onShowToast('Unable to access clipboard. Please use Ctrl+V / Cmd+V.', 'info');
    }
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size: 2MB limit
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      onShowToast('File size exceeds 2 MB limit! (فائل کا سائز بڑا ہے)', 'error');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        onUpdateText(content);
        onShowToast(`File "${file.name}" uploaded successfully!`, 'success');
      }
      e.target.value = '';
    };
    reader.onerror = () => {
      onShowToast('Failed to read text file', 'error');
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  // Download plain text report
  const handleDownloadTxt = () => {
    const report = generateTextReport(stats);
    downloadFile(report, 'word_counter_report.txt', 'text/plain;charset=utf-8');
    onShowToast('Text report downloaded! (.txt رپورٹ ڈاؤنلوڈ ہوگئی)', 'success');
  };

  // Download CSV report
  const handleDownloadCsv = () => {
    const csv = generateCsvReport(stats);
    downloadFile(csv, 'word_counter_report.csv', 'text/csv;charset=utf-8');
    onShowToast('CSV report downloaded! (.csv رپورٹ ڈاؤنلوڈ ہوگئی)', 'success');
  };

  // Copy statistics summary to clipboard
  const handleCopySummary = async () => {
    const report = generateTextReport(stats);
    try {
      await navigator.clipboard.writeText(report);
      onShowToast('Statistics summary copied to clipboard!', 'success');
    } catch {
      onShowToast('Failed to copy statistics summary', 'error');
    }
  };

  // Cleanup action handlers
  const handleCleanup = (cleanupFn, label) => {
    if (!text) return;
    const modified = cleanupFn(text);
    onUpdateText(modified);
    onShowToast(`Applied: ${label}`, 'success');
  };

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      {/* Top Row: Primary Actions */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
        {/* Left Actions (Copy, Paste, Upload, Clear) */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs"
            title="Copy text (متن کاپی کریں)"
            aria-label="Copy text"
          >
            <Copy className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Copy</span>
          </button>

          <button
            type="button"
            onClick={handlePasteText}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs"
            title="Paste from clipboard (چسپاں کریں)"
            aria-label="Paste text"
          >
            <ClipboardPaste className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Paste</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs"
            title="Upload .txt file (فائل اپلوڈ کریں)"
            aria-label="Upload .txt file"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Upload<span className="hidden sm:inline"> .txt</span></span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/plain"
            onChange={handleFileUpload}
            className="hidden"
            aria-label="File upload input"
          />

          <button
            type="button"
            onClick={onOpenClearDialog}
            disabled={!text}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium transition-colors shadow-2xs"
            title="Clear all text (صاف کریں)"
            aria-label="Clear all text"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* Right Actions (Copy Stats, Downloads) */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs"
            title="Copy summary report to clipboard (رپورٹ کاپی کریں)"
            aria-label="Copy statistics summary"
          >
            <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Stats</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs"
            title="Download TXT Report"
            aria-label="Download TXT Report"
          >
            <Download className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>.TXT</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs"
            title="Download CSV Report"
            aria-label="Download CSV Report"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>.CSV</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Text Cleanup & Case Tools */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto no-scrollbar pb-0.5">
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0 mr-0.5">
          Cleanup:
        </span>

        {/* Remove extra spaces */}
        <button
          type="button"
          onClick={() => handleCleanup(removeExtraSpaces, 'Removed extra spaces')}
          disabled={!text}
          className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 transition-colors shrink-0"
          title="Collapse multiple consecutive spaces into a single space"
        >
          <Space className="w-3 h-3 text-slate-500" />
          <span>Extra Spaces</span>
        </button>

        {/* Remove empty lines */}
        <button
          type="button"
          onClick={() => handleCleanup(removeEmptyLines, 'Removed empty lines')}
          disabled={!text}
          className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 transition-colors shrink-0"
          title="Remove blank lines"
        >
          <Minimize2 className="w-3 h-3 text-slate-500" />
          <span>Empty Lines</span>
        </button>

        {/* Trim lines */}
        <button
          type="button"
          onClick={() => handleCleanup(trimLines, 'Trimmed lines')}
          disabled={!text}
          className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 transition-colors shrink-0"
          title="Trim whitespace from line start and end"
        >
          <Scissors className="w-3 h-3 text-slate-500" />
          <span>Trim Lines</span>
        </button>

        <span className="text-slate-300 dark:text-slate-700 shrink-0">|</span>

        {/* UPPERCASE */}
        <button
          type="button"
          onClick={() => handleCleanup(toUpperCase, 'Converted to UPPERCASE')}
          disabled={!text}
          className="px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 transition-colors shrink-0"
          title="Convert Latin text to UPPERCASE (اردو برقرار رہے گی)"
        >
          UPPER
        </button>

        {/* lowercase */}
        <button
          type="button"
          onClick={() => handleCleanup(toLowerCase, 'Converted to lowercase')}
          disabled={!text}
          className="px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 transition-colors shrink-0"
          title="Convert Latin text to lowercase (اردو برقرار رہے گی)"
        >
          lower
        </button>

        {/* Title Case */}
        <button
          type="button"
          onClick={() => handleCleanup(toTitleCase, 'Converted to Title Case')}
          disabled={!text}
          className="px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 transition-colors shrink-0"
          title="Capitalize Latin words (Title Case)"
        >
          Title Case
        </button>
      </div>
    </div>
  );
}
