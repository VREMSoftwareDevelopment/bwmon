import React from 'react';
import { create } from 'react-test-renderer';
import ErrorBoundary from './ErrorBoundary';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const Something = () => null;

describe('<ErrorBoundary> window', () => {
    test('renders correctly', () => {
        const tree = create(
            <ErrorBoundary>
                <Something />
            </ErrorBoundary>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders error', () => {
        const error = new Error('Error!!!');
        const wrapper = mount(
            <ErrorBoundary>
                <Something />
            </ErrorBoundary>
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.find(Something).simulateError(error);
        expect(wrapper).toMatchSnapshot();
    });
});
