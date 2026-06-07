import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-center md:items-center p-0 md:p-6" dir="rtl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-transparent backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white rounded-t-[2rem] md:rounded-[2.5rem] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.3)] w-full max-w-2xl animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300 relative z-10 border border-white/20 flex flex-col min-h-0" style={{ maxHeight: 'min(90dvh, 90vh)' }}>
        {/* Header */}
        <div className="px-6 py-5 md:px-8 md:py-6 border-b border-surface-container flex items-center justify-between bg-white flex-shrink-0">
          <h3 className="text-lg md:text-xl font-heading font-black text-primary tracking-tight leading-none">{title}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-primary/5 text-on-background/30 hover:text-primary transition-all flex items-center justify-center group active:scale-90"
          >
            <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">close</span>
          </button>
        </div>

        {/* Content — flex-grow so children can fill and scroll */}
        <div className="flex-grow flex flex-col min-h-0 overflow-hidden">
          {children}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.1); }
      `}</style>
    </div>,
    document.body
  );
};

export default Modal;
