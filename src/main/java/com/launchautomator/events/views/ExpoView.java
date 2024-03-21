package com.launchautomator.events.views;

import akka.actor.ActorSystem;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;

import static akka.pattern.Patterns.ask;

@PageTitle("Expo")
@Route(value = "expo", layout = MainLayout.class)
@RolesAllowed("USER")
public class ExpoView extends HorizontalLayout {

    private TextField name;
    private Button sayHello;

    ActorSystem system;

    public ExpoView(ActorSystem system) {
        sayHello.addClickShortcut(Key.ENTER);

        setMargin(true);
        setVerticalComponentAlignment(Alignment.END, name, sayHello);

        add(name, sayHello);
    }

}
