package com.launchautomator.events.actors.chat;

import akka.actor.typed.ActorRef;

import java.time.Instant;

public record ChatMessage(String message, Instant timeStamp, String userName, String userImageUrl, ActorRef<ChatCommand> from) implements ChatCommand {}
