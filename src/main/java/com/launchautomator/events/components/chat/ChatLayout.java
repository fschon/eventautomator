package com.launchautomator.events.components.chat;


import akka.actor.typed.ActorRef;
import akka.actor.typed.ActorSystem;
import akka.actor.typed.Props;
import akka.actor.typed.SpawnProtocol;
import akka.actor.typed.javadsl.*;
import com.launchautomator.events.ChatSessions;
import com.launchautomator.events.actors.chat.*;
import com.launchautomator.events.data.ChatRoom;
import com.launchautomator.events.data.User;
import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletionStage;

public class ChatLayout extends VerticalLayout {

    private ActorRef<ChatCommand> uiActor;
    ActorRef<ChatCommand> chatSessionActor;
    public MessageList messageList = new MessageList();
    MessageInput messageInput = new MessageInput();
    public List<MessageListItem> items = new ArrayList<>();

    ChatSessions chatSessions;
    User user;
    ChatRoom chatRoom;

    public ChatLayout(ActorSystem<SpawnProtocol.Command> system, ChatSessions chatSessions, User user, ChatRoom chatRoom) {
        this.chatSessions = chatSessions;
        this.user = user;
        this.chatRoom = chatRoom;

        messageInput.setWidth("600px");
        add(messageList, messageInput);

        // See: to create actors: https://doc.akka.io/docs/akka/current/typed/actor-lifecycle.html#creating-actors
        final Duration timeout = Duration.ofSeconds(3);
        CompletionStage<ActorRef<ChatCommand>> uiActorReq =
                AskPattern.ask(
                        system,
                        replyTo -> new SpawnProtocol.Spawn<>(ChatUIActor.create(this), "chatUIActor", Props.empty(), replyTo),
                        timeout,
                        system.scheduler());
        //uiActorReq.whenComplete((actorRef, exc) -> {
        //    uiActor = actorRef;
        //});
        uiActor = uiActorReq.toCompletableFuture().join();
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        if (chatSessionActor == null) {
            System.out.println("Looking up chat session actor " + chatRoom.getId());
            chatSessionActor = chatSessions.getSession(chatRoom.getId());
        }

        chatSessionActor.tell(new ChatJoin( Instant.now(), user.getName(), uiActor));

        messageInput.addSubmitListener(e -> {
            chatSessionActor.tell(new ChatMessage(e.getValue(), Instant.now(), user.getName(), null, uiActor));
        });
    }

    @Override
    protected void onDetach(DetachEvent detachEvent) {
        chatSessionActor.tell(new ChatLeave(Instant.now(), user.getName(), uiActor));
    }

}
