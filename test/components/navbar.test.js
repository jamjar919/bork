import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Navbar from '../../src/components/Navbar';

describe('navbar component', () => {
    // setup
    let mountedNavbar;
    const navbar = () => {
        if (!mountedNavbar) {
            mountedNavbar = mount(
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>,
            );
        }
        return mountedNavbar;
    };

    beforeEach(() => {
        mountedNavbar = undefined;
    });

    // tests
    it('always renders a div', () => {
        const divs = navbar().find('div');
        expect(divs.length).toBeGreaterThan(0);
    });
});
