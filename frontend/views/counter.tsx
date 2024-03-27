import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

// See:
// https://vaadin.com/docs/next/flow/integrations/hilla
// https://github.com/vaadin/flow-hilla-hybrid-example/
export default function counter() {
    const [counter, setCounter] = useState(0);

    return (
        <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
            <Button onClick={() => setCounter(counter + 1)}>Button 1</Button>
            <p>Clicked {counter} times</p>
        </HorizontalLayout>
    );
}