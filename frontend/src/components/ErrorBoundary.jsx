import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center min-h-screen text-center">
          <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Something went wrong.</h2>
            <p>Please try refreshing the page.</p>
            <details className="mt-2 text-sm">
              {this.state.error?.toString()}
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
