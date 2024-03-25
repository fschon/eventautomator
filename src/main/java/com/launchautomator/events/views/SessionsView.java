package com.launchautomator.events.views;

import com.launchautomator.events.components.videoconf.VideoConf;
import com.launchautomator.events.views.MainLayout;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;

@PageTitle("Sessions")
@Route(value = "sessions", layout = MainLayout.class)
@RolesAllowed("USER")
public class SessionsView extends HorizontalLayout {

    private VideoConf videoConf;

    public SessionsView() {
        videoConf = new VideoConf();
        add(videoConf);
    }

}
