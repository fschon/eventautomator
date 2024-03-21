package com.launchautomator.events.actors.chat;

import akka.actor.typed.ActorRef;
import akka.actor.typed.Behavior;
import akka.actor.typed.javadsl.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ChatSessionActor extends AbstractBehavior<ChatCommand> {

    private Set<ActorRef<ChatCommand>> registeredClients = new HashSet<>();
    private List<ChatCommand> messages = new ArrayList<>();

    public ChatSessionActor(ActorContext<ChatCommand> context) {
        super(context);
    }

    public static Behavior<ChatCommand> create() {
        return Behaviors.setup(ChatSessionActor::new);
    }

    @Override
    public Receive<ChatCommand> createReceive() {
        return newReceiveBuilder()
                .onMessage(ChatMessage.class, this::onMessage)
                .onMessage(ChatJoin.class, this::onJoin)
                .onMessage(ChatLeave.class, this::onLeave)
                .build();
    }

    private Behavior<ChatCommand> onMessage(ChatMessage message) {
        registeredClients.forEach(client -> client.tell(new ChatMessage(message.message(), message.timeStamp(), message.userName(), message.userImageUrl(), getContext().getSelf())));
        messages.add(message);
        return this;
    }

    private Behavior<ChatCommand> onJoin(ChatJoin message) {
        var chatClientActor = message.from();
        System.out.println("Registering: " + message.userName());
        registeredClients.add(chatClientActor);
        messages.forEach(chatClientActor::tell);
        return this;
    }

    private Behavior<ChatCommand> onLeave(ChatLeave message) {
        var chatClientActor = message.from();
        System.out.println("Deregistering: " + message.userName());
        registeredClients.remove(chatClientActor);
        return this;
    }

}
