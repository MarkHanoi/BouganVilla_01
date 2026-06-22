import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State { return { error }; }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback ?? (
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem",
            backgroundColor: "var(--color-cream)",
          }}
        >
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-charcoal)" }}>
            Something went wrong
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--color-charcoal-muted)", maxWidth: "36rem", textAlign: "center", fontWeight: 300 }}>
            {this.state.error.message}
          </p>
          <button
            onClick={() => { this.setState({ error: null }); window.location.href = "/"; }}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 2rem",
              fontSize: "0.6875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "white",
              backgroundColor: "var(--color-terracotta)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
