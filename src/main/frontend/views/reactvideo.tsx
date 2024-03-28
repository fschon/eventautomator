import React, { useState } from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';


// See:
// https://vaadin.com/docs/next/flow/integrations/hilla
// https://github.com/vaadin/flow-hilla-hybrid-example/tree/v24.4

const serverUrl = 'wss://event-automator-332245jc.livekit.cloud';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTE2MjIyNzEsImlzcyI6IkFQSU1UNzV1R0NaeW1vMiIsIm5iZiI6MTcxMTYxNTA3MSwic3ViIjoicXVpY2tzdGFydCB1c2VyIDduM3FhbSIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJxdWlja3N0YXJ0IHJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.E2iQTdGzFDZv1U31qH8pO2GCeIi162xh3mTgT2lzixQ';

export default function reactvideo() {
    return (
        <LiveKitRoom token={token} serverUrl={serverUrl} connect={true}>
            <VideoConference />
        </LiveKitRoom>
    );
}