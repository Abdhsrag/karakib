import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6" dir="rtl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary/40 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 relative z-10 border border-white/20">
        {/* Header */}
        <div className="px-8 py-6 border-b border-surface-container flex items-center justify-between bg-white sticky top-0 z-20">
          <h3 className="text-xl font-heading font-black text-primary tracking-tight leading-none">{title}</h3>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-primary/5 text-on-background/30 hover:text-primary transition-all flex items-center justify-center group active:scale-90"
          >
            <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.1); }
      `}</style>
    </div>
  );
};

export default Modal;

