package com.example;

import com.google.protobuf.util.JsonFormat;

import java.io.IOException;

import io.livekit.server.RoomServiceClient;
import livekit.LivekitModels;
import retrofit2.Call;
import retrofit2.Response;

public class Main {
  public static void main(String[] args) throws IOException {

    RoomServiceClient client = RoomServiceClient.create(
            "https://event-automator-332245jc.livekit.cloud",
            "APIMT75uGCZymo2",
            "dT5v2nZvemuaioTmC9kwcvFdxbB5UhRJUpaJjvS96ZC");

    Call<LivekitModels.Room> call = client.createRoom("room_name");
    Response<LivekitModels.Room> response = call.execute(); // Use call.enqueue for async
    LivekitModels.Room room = response.body();

    System.out.println(JsonFormat.printer().print(room));
  }
}