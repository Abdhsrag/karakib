import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4" dir="rtl">
          <div className="max-w-md text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-error/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-error">error</span>
            </div>
            <h1 className="text-2xl font-black text-primary">حدث خطأ غير متوقع</h1>
            <p className="text-on-background/60 font-bold text-sm">Something went wrong. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-primary text-white rounded-2xl font-black hover:bg-primary-hover transition-all shadow-xl shadow-primary/20"
            >
              تحديث الصفحة / Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
