import React, { useState } from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

// See:
// https://vaadin.com/docs/next/flow/integrations/hilla
// https://github.com/vaadin/flow-hilla-hybrid-example/tree/v24.4
export default function counter() {
    const [counter, setCounter] = useState(0);

    return (
        <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
            <Button onClick={() => setCounter(counter + 1)}>Button 1</Button>
            <p>Clicked {counter} times</p>
        </HorizontalLayout>
    );
}