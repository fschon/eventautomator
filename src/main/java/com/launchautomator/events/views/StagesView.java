package com.launchautomator.events.views;

import com.launchautomator.events.components.ReactInput;
import com.launchautomator.events.views.MainLayout;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.NativeButton;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;

@PageTitle("Stages")
@Route(value = "stages", layout = MainLayout.class)
@RolesAllowed("USER")
public class StagesView extends HorizontalLayout {

    private TextField name;
    private Button sayHello;

    public StagesView() {
        var input = new ReactInput("initialValue");

        var listenerOutput = new Span();
        listenerOutput.setId("listenerOutput");

        input.addValueChangeListener(listenerOutput::setText);

        var setValueButton = new NativeButton("Set value",
                (event) -> input.setValue("set value"));
        setValueButton.setId("setValueButton");

        var getOutput = new Span();
        getOutput.setId("getOutput");

        var getValueButton = new NativeButton("Get value",
                (event) -> getOutput.setText(input.getValue()));
        getValueButton.setId("getValueButton");

        add(new Div(input, listenerOutput), new Div(setValueButton),
                new Div(getValueButton, getOutput));
    }

}
