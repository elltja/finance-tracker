import React from "react";
import Button from "./shared/Button";

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-semibold">Ooops...</h1>
          <span>Something went wrong.</span>
          <Button
            className="px-4 my-1"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
