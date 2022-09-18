import React, { PropsWithChildren } from 'react';

import ErrorProtector from './ErrorProtector';

type Props = {
  children: React.ReactNode;
};

type State = {
  error: Error | null;
};

class ErrorBoundary extends React.Component<PropsWithChildren, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
    });

    console.log(error, errorInfo);
  }

  render(): React.ReactNode {
    const { error } = this.state;
    const { children } = this.props;

    return error ? <ErrorProtector error={error?.toString()} /> : children;
  }
}

export default ErrorBoundary;
