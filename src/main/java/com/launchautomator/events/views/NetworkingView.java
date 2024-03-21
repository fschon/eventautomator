package com.launchautomator.events.views;

import akka.actor.typed.ActorSystem;
import com.launchautomator.events.ChatSessions;
import com.launchautomator.events.data.Event;
import com.launchautomator.events.security.AuthenticatedUser;
import com.launchautomator.events.views.components.ChatLayout;
import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;

@PageTitle("Networking")
@Route(value = "networking", layout = MainLayout.class)
@RolesAllowed("USER")
public class NetworkingView extends HorizontalLayout {

    private ChatLayout chat;

    @Autowired
    ActorSystem system;
    @Autowired
    ChatSessions chatSessions;
    @Autowired
    AuthenticatedUser authenticatedUser;
    @Autowired
    Event event;

    public NetworkingView() {

    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        chat = new ChatLayout(system, chatSessions, authenticatedUser.get().get(), event.getReceptionChatRoom());
        add(chat);
    }
}
