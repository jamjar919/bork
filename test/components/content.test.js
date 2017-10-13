import React from 'react';
import { mount } from 'enzyme';
import Content from '../../src/components/Content';

describe('content component', () => {
    // setup
    let mountedContent;
    const content = () => {
        if (!mountedContent) {
            mountedContent = mount(
                <Content />,
            );
        }
        return mountedContent;
    };

    beforeEach(() => {
        mountedContent = undefined;
    });

    // tests
    it('always renders a div', () => {
        const divs = content().find('div');
        expect(divs.length).toBeGreaterThan(0);
    });
});
