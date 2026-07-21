/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import Modal from './Modal';

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    title: '',
    message: '',
    confirmText: 'تأكيد / Confirm',
    cancelText: 'إلغاء / Cancel',
    variant: 'danger',
  });
  const [resolver, setResolver] = useState(null);

  const confirm = useCallback(({ title, message, confirmText, cancelText, variant = 'danger' }) => {
    return new Promise((resolve) => {
      setState({ open: true, title, message, confirmText, cancelText, variant });
      setResolver(() => resolve);
    });
  }, []);

  const handleConfirm = () => {
    setState((s) => ({ ...s, open: false }));
    if (resolver) resolver(true);
  };

  const handleCancel = () => {
    setState((s) => ({ ...s, open: false }));
    if (resolver) resolver(false);
  };

  const confirmBtnStyle = state.variant === 'danger'
    ? 'bg-error text-white hover:bg-error/90 shadow-xl shadow-error/20'
    : 'bg-primary text-white hover:bg-primary-hover shadow-xl shadow-primary/20';

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state.open && (
        <Modal isOpen={state.open} onClose={handleCancel} title={state.title}>
          <div className="p-6 md:p-8">
            <p className="text-on-background/70 font-bold text-sm md:text-base leading-relaxed">{state.message}</p>
          </div>
          <div className="p-5 md:p-6 border-t border-surface-container flex flex-col-reverse sm:flex-row gap-3 bg-white flex-shrink-0">
            <button
              onClick={handleCancel}
              className="flex-1 px-6 py-3.5 border border-surface-container rounded-2xl text-primary font-black hover:bg-surface-container transition-all text-sm"
            >
              {state.cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 px-6 py-3.5 rounded-2xl font-black transition-all text-sm ${confirmBtnStyle}`}
            >
              {state.confirmText}
            </button>
          </div>
        </Modal>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used within ConfirmProvider');
  return ctx.confirm;
}
