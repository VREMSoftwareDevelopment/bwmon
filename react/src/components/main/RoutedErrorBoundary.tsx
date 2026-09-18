/*
 *      Copyright (C) 2010 - 2026 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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

import type { ErrorInfo, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router';
import ErrorDisplay from './ErrorDisplay';

export interface RoutedErrorBoundaryProps {
    children: ReactNode;
}

const logError = (error: unknown, info: ErrorInfo) => {
    console.error(error, info.componentStack);
};

const RoutedErrorBoundary = ({ children }: RoutedErrorBoundaryProps) => {
    const { pathname } = useLocation();

    return (
        <ErrorBoundary FallbackComponent={ErrorDisplay} resetKeys={[pathname]} onError={logError}>
            {children}
        </ErrorBoundary>
    );
};

export default RoutedErrorBoundary;
