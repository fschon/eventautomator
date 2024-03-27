package com.launchautomator.events.views;

import com.launchautomator.events.components.videoconf.JavaRoom;
import com.launchautomator.events.components.videoconf.VideoConfRoom;
import com.launchautomator.events.data.Event;
import com.launchautomator.events.security.AuthenticatedUser;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;

@PageTitle("Sessions")
@Route(value = "sessions", layout = MainLayout.class)
@RolesAllowed("USER")
public class SessionsView extends HorizontalLayout {

    //@Autowired
    //AuthenticatedUser authenticatedUser;

    @Autowired
    Event event;
    private VideoConfRoom videoConf;

    public SessionsView(AuthenticatedUser authenticatedUser, Event event) {
        videoConf = new VideoConfRoom(authenticatedUser.get().get(), event, "sessionRoom");
        add(videoConf);
        //var javaRoom = new JavaRoom();
        //add(javaRoom);
    }

}
