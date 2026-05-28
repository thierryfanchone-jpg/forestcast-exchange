"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface State {
  err: Error | null;
}

/**
 * Generic React error boundary used to wrap async/data-driven panels.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { err: null };

  static getDerivedStateFromError(err: Error) {
    return { err };
  }

  componentDidCatch(err: Error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[ErrorBoundary]", err);
    }
  }

  render() {
    if (!this.state.err) return this.props.children;
    return (
      this.props.fallback ?? (
        <div className="rounded-2xl border border-danger/30 bg-danger/5 p-6 text-sm text-danger">
          Something went wrong rendering this panel.
        </div>
      )
    );
  }
}
