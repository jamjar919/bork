import React from 'react';
import { mount } from 'enzyme';
import Root from '../../src/containers/root';

describe('root component', () => {
    // setup
    let mountedRoot;
    const root = () => {
        if (!mountedRoot) {
            mountedRoot = mount(
                <Root />,
            );
        }
        return mountedRoot;
    };

    beforeEach(() => {
        mountedRoot = undefined;
    });

    // tests
    it('always renders a div', () => {
        const divs = root().find('div');
        expect(divs.length).toBeGreaterThan(0);
    });

    describe('the rendered div', () => {
        it('contains everything else that gets rendered', () => {
            const divs = root().find('div');
            // .find arranges in order -> outermode node is first
            const wrappingDiv = divs.first();

            expect(wrappingDiv.children()).toEqual(root().children());
        });
    });
});
