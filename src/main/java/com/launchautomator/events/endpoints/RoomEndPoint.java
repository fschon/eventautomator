package com.launchautomator.events.endpoints;


import com.launchautomator.events.data.Event;
import com.launchautomator.events.data.User;
import com.launchautomator.events.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.Nonnull;
import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class RoomEndPoint {
    Logger log = LoggerFactory.getLogger(getClass());

    private final String roomName;
    AuthenticatedUser user;
    Event event;

    public RoomEndPoint(@Autowired AuthenticatedUser authenticatedUser, @Autowired Event event) {
        this.user = authenticatedUser;
        this.event = event;
        this.roomName = "testRoom";
    }

    @Nonnull
    public String getUrl() {
        var url =  "wss://event-automator-332245jc.livekit.cloud";
        log.info("getUrl() = {}", url);
        return url;
    }

    @Nonnull
    public String getToken() {
        AccessToken token = new AccessToken("APIMT75uGCZymo2", "dT5v2nZvemuaioTmC9kwcvFdxbB5UhRJUpaJjvS96ZC");

        // Fill in token information.
        token.setName(user.get().get().getName());
        token.setIdentity(event.getId() + "-" + user.get().get().getId().toString());
        token.setMetadata("metadata");
        token.addGrants(new RoomJoin(true), new RoomName(roomName));

        // Sign and create token string.
        var tok =  token.toJwt().toString();
        log.info("getToken() = {}", tok);
        return tok;
    }
}