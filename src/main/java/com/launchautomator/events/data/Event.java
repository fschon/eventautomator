package com.launchautomator.events.data;

public class Event extends AbstractEntity {

    String name;
    ChatRoom receptionChatRoom;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ChatRoom getReceptionChatRoom() {
        return receptionChatRoom;
    }

    public void setReceptionChatRoom(ChatRoom receptionChatRoom) {
        this.receptionChatRoom = receptionChatRoom;
    }
}
