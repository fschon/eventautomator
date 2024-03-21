package com.launchautomator.events.actors.chat;

import akka.actor.typed.ActorRef;

import java.time.Instant;

public record ChatLeave(Instant timeStamp, String userName, ActorRef<ChatCommand> from) implements ChatCommand {}
