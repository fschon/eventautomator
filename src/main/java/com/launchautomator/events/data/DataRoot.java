package com.launchautomator.events.data;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class DataRoot {

    public Map<String, User> userNameMap = new HashMap();
    public Map<UUID, User> userIdMap = new HashMap();

    public Map<UUID, ChatRoom> chatRoomIdMap = new HashMap();
    public Map<UUID, Event> eventIdMap = new HashMap();
}
