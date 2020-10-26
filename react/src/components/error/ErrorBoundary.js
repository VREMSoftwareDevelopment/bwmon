/*
 *      Copyright (C) 2010 - 2020 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
 *
 *      Licensed under the Apache License, Version 2.0 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *           http: //www.apache.org/licenses/LICENSE-2.0
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 *
 * Bandwidth Monitor
 */

import React, { Component } from 'react';
import Error from '../messages/Error';

export default class ErrorBoundary extends Component {
    state = { error: null, errorInfo: null };

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
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
