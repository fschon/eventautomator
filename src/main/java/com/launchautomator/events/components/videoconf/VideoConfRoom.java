package com.launchautomator.events.components.videoconf;

import com.launchautomator.events.data.Event;
import com.launchautomator.events.data.User;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.notification.Notification;
import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;
import io.livekit.server.RoomServiceClient;
import livekit.LivekitModels;
import retrofit2.Call;
import retrofit2.Response;

import java.io.IOException;

@Tag("video-conf-room")
@JsModule("./src/video-conf-room.ts")
@NpmPackage(value = "livekit-client", version = "2.0.10")
//@NpmPackage(value = "@lit/task", version = "1.0.0")
//@NpmPackage(value = "lit/decorators", version = "0.3.0")
public class VideoConfRoom extends LitTemplate {

    LivekitModels.Room room;

    /**
     * See: https://www.npmjs.com/package/livekit-client
     */
    public VideoConfRoom(User user, Event event, String roomName) {
        getElement().setProperty("url", "wss://event-automator-332245jc.livekit.cloud");

        AccessToken token = new AccessToken("APIMT75uGCZymo2", "dT5v2nZvemuaioTmC9kwcvFdxbB5UhRJUpaJjvS96ZC");

        // Fill in token information.
        token.setName(user.getName());
        token.setIdentity(event.getId() + "-" + user.getId().toString());
        token.setMetadata("metadata");
        token.addGrants(new RoomJoin(true), new RoomName(roomName));

        // Sign and create token string.
        getElement().setProperty("token", token.toJwt());


        try {
            RoomServiceClient client = RoomServiceClient.create(
                    "http://event-automator-332245jc.livekit.cloud",
                    "APIMT75uGCZymo2",
                    "dT5v2nZvemuaioTmC9kwcvFdxbB5UhRJUpaJjvS96ZC");

            Call<LivekitModels.Room> call = client.createRoom(roomName);
            Response<LivekitModels.Room> response = call.execute(); // Use call.enqueue for async
            room = response.body();

        } catch (IOException e) {
            Notification.show(e.getMessage(), 0, Notification.Position.MIDDLE);
        }

    }

    public void disconnect() {

    }
}