package com.launchautomator.events.components.videoconf;

import com.launchautomator.events.data.Event;
import com.launchautomator.events.data.User;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.react.ReactAdapterComponent;
import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/***
 * See: https://github.com/vaadin/flow/tree/main/flow-tests/test-react-adapter
 */
@Tag("react-component-room")
@JsModule("./ReactComponentRoom.tsx")
@NpmPackage(value = "livekit-client", version = "2.0.10")
public class ReactComponentRoom extends ReactAdapterComponent {
    Logger log = LoggerFactory.getLogger(this.getClass());

    String url;
    String token;

    public String getUrl() {
        log.info("getUrl() {}", url);
        return getState("url", String.class);
    }

    public void setUrl(String url) {
        setState("url", url);
    }

    public String getToken() {
        log.info("getToken() {}", token);
        return getState("token", String.class);
    }

    public void setToken(String token) {
        setState("token", token);
    }

    public ReactComponentRoom(User user, Event event, String roomName) {
        setUrl("wss://event-automator-332245jc.livekit.cloud");

        AccessToken token = new AccessToken("APIMT75uGCZymo2", "dT5v2nZvemuaioTmC9kwcvFdxbB5UhRJUpaJjvS96ZC");

        // Fill in token information.
        token.setName(user.getName());
        token.setIdentity(event.getId() + "-" + user.getId().toString());
        token.setMetadata("metadata");
        token.addGrants(new RoomJoin(true), new RoomName(roomName));

        // Sign and create token string.
        setToken(token.toJwt().toString());
    }

    public void disconnect() {

    }
}