package com.launchautomator.events.actors.chat;

import akka.actor.typed.Behavior;
import akka.actor.typed.javadsl.AbstractBehavior;
import akka.actor.typed.javadsl.ActorContext;
import akka.actor.typed.javadsl.Behaviors;
import akka.actor.typed.javadsl.Receive;
import com.launchautomator.events.components.chat.ChatLayout;
import com.vaadin.flow.component.messages.MessageListItem;

public class ChatUIActor extends AbstractBehavior<ChatCommand> {

    private ChatLayout chat;

    public ChatUIActor(ActorContext<ChatCommand> context, ChatLayout chat) {
        super(context);
        this.chat = chat;
    }

    public static Behavior<ChatCommand> create(ChatLayout chat) {
        return Behaviors.setup(context -> new ChatUIActor(context, chat));
    }

    @Override
    public Receive<ChatCommand> createReceive() {
        return newReceiveBuilder()
                .onMessage(ChatMessage.class, this::onReceive)
                .build();
    }


    private Behavior<ChatCommand> onReceive(ChatMessage command) {
        chat.getUI().get().access(() -> {
            chat.items.add(new MessageListItem(command.message(), command.timeStamp(), command.userName(), command.userImageUrl()));
            chat.messageList.setItems(chat.items);
        });
        return this;
    }

}
