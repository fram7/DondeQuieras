import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './navMenu/NavMenu';

export default function Component({ children }) {

    return (
        <div>
            <NavMenu />
            <Container>
                {children}
            </Container>
        </div>
    );
}
