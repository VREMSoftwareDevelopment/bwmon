import React, { Component } from 'react';
import Error from '../messages/Error';

export default class ErrorBoundary extends Component {
    state = { error: null, errorInfo: null };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    renderError = () => (this.state.error ? <Error message={this.state.error.toString()} /> : null);
    renderErrorInfo = () => (this.state.errorInfo ? <div>{this.state.errorInfo.componentStack}</div> : null);

    render() {
        if (this.state.error || this.state.errorInfo) {
            return (
                <div>
                    {this.renderError()}
                    {this.renderErrorInfo()}
                </div>
            );
        }
        return this.props.children;
    }
}
