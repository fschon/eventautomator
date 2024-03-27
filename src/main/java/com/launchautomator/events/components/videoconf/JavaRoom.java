package com.launchautomator.events.components.videoconf;

import com.google.protobuf.util.JsonFormat;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import io.livekit.server.RoomServiceClient;
import livekit.LivekitModels;
import retrofit2.Call;
import retrofit2.Response;

import java.io.IOException;

public class JavaRoom extends VerticalLayout {

    public JavaRoom() {
        try {
            RoomServiceClient client = RoomServiceClient.create(
                    "http://event-automator-332245jc.livekit.cloud",
                    "APIMT75uGCZymo2",
                    "dT5v2nZvemuaioTmC9kwcvFdxbB5UhRJUpaJjvS96ZC");

            Call<LivekitModels.Room> call = client.createRoom("room_name");
            Response<LivekitModels.Room> response = call.execute(); // Use call.enqueue for async
            LivekitModels.Room room = response.body();

            System.out.println(JsonFormat.printer().print(room));
        } catch (IOException e) {
            Notification.show(e.getMessage(), 0, Notification.Position.MIDDLE);
        }
    }
}
