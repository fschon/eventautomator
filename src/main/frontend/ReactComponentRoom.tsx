import { ReactAdapterElement } from 'Frontend/generated/flow/ReactAdapter.js';
import {ChangeEvent, useCallback} from 'react';
import {LiveKitRoom, VideoConference} from "@livekit/components-react";
import '@livekit/components-styles';


// See: https://github.com/vaadin/flow/tree/main/flow-tests/test-react-adapter
class ReactComponentRoom extends ReactAdapterElement {
    protected override render() {
        const [url, setUrl] = this.useState<string>('url');
        const [token, setToken] = this.useState<string>('token');

        //const changeListener = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        //    setValue(event.target.value)
        //}, [setValue]);

        return <LiveKitRoom serverUrl={url} token={token}><VideoConference /></LiveKitRoom>;
    }
}

customElements.define('react-component-room', ReactComponentRoom);