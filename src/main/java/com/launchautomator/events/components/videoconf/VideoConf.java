package com.launchautomator.events.components.videoconf;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.littemplate.LitTemplate;
import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;

import java.io.IOException;

@Tag("video-conf")
@JsModule("./src/video-conf.ts")
@NpmPackage(value = "livekit-client", version = "2.0.8")
//@NpmPackage(value = "@lit/task", version = "1.0.0")
//@NpmPackage(value = "lit/decorators", version = "0.3.0")
public class VideoConf extends LitTemplate {

    /**
     * See: https://www.npmjs.com/package/livekit-client
     */
    public VideoConf() {
        getElement().setProperty("url", "wss://event-automator-332245jc.livekit.cloud");
        //getElement().setProperty("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTEzNjAyODYsImlzcyI6IkFQSU1UNzV1R0NaeW1vMiIsIm5iZiI6MTcxMTM1MzA4Niwic3ViIjoicXVpY2tzdGFydCB1c2VyIDVpa3RyaCIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJxdWlja3N0YXJ0IHJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.WVAowjlhajmGm_M5iyVYtmOxfCp2-F1oReBCGILjJFI");

        AccessToken token = new AccessToken("APIMT75uGCZymo2", "dT5v2nZvemuaioTmC9kwcvFdxbB5UhRJUpaJjvS96ZC");

        // Fill in token information.
        token.setName("name");
        token.setIdentity("identity");
        token.setMetadata("metadata");
        token.addGrants(new RoomJoin(true), new RoomName("myroom"));

        // Sign and create token string.
        getElement().setProperty("token", token.toJwt());
    }
}