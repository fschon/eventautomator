package com.launchautomator.events.data;


import java.util.UUID;

public abstract class AbstractEntity {

    private UUID id = UUID.randomUUID();

    private int version;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getVersion() {
        return version;
    }

}
