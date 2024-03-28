package com.launchautomator.events.views;

import akka.actor.ActorSystem;
import com.launchautomator.events.components.videoconf.ReactComponentRoom;
import com.launchautomator.events.data.Event;
import com.launchautomator.events.security.AuthenticatedUser;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import static akka.pattern.Patterns.ask;

@PageTitle("Expo")
@Route(value = "expo", layout = MainLayout.class)
@RolesAllowed("USER")
public class ExpoView extends HorizontalLayout {

    ReactComponentRoom reactComponentRoom;
    ActorSystem system;

    public ExpoView(@Autowired AuthenticatedUser authenticatedUser, @Autowired Event event) {
        reactComponentRoom = new ReactComponentRoom(authenticatedUser.get().get(), event, "expoRoom");

        add(reactComponentRoom);
    }

}
