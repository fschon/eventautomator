package com.launchautomator.events.components.videoconf;

import com.launchautomator.events.data.Event;
import com.launchautomator.events.data.User;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.react.ReactAdapterComponent;
import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;
import io.livekit.server.RoomServiceClient;
import livekit.LivekitModels;
import retrofit2.Call;
import retrofit2.Response;

import java.io.IOException;

//@Tag("react-room")
//@JsModule("./src/react-room.ts")
//@NpmPackage(value = "livekit-client", version = "2.0.10")
public class ReactRoom extends ReactAdapterComponent {

    String url;
    String token;

    public String getUrl() {
        return getState("url", String.class);
    }

    public void setUrl(String url) {
        setState("url", url);
    }

    public String getToken() {
        return getState("token", String.class);
    }

    public void setToken(String token) {
        setState("token", token);
    }

    public ReactRoom(User user, Event event, String roomName) {
        setUrl("wss://event-automator-332245jc.livekit.cloud");

        AccessToken token = new AccessToken("APIMT75uGCZymo2", "dT5v2nZvemuaioTmC9kwcvFdxbB5UhRJUpaJjvS96ZC");

        // Fill in token information.
        token.setName(user.getName());
        token.setIdentity(event.getId() + "-" + user.getId().toString());
        token.setMetadata("metadata");
        token.addGrants(new RoomJoin(true), new RoomName(roomName));

        // Sign and create token string.
        getElement().setProperty("token", token.toJwt());

        setToken(token.toString());


    }

    public void disconnect() {

    }
}