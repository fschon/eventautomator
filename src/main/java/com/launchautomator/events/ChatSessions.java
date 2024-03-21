package com.launchautomator.events;

import akka.actor.typed.ActorSystem;
import akka.actor.typed.ActorRef;
import akka.actor.typed.Props;
import akka.actor.typed.SpawnProtocol;
import akka.actor.typed.javadsl.AskPattern;
import com.launchautomator.events.actors.chat.ChatCommand;
import com.launchautomator.events.actors.chat.ChatSessionActor;
import org.atmosphere.inject.annotation.ApplicationScoped;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.ConcurrentHashMap;

@Component
@ApplicationScoped
public class ChatSessions {

    private final Map<UUID, ActorRef<ChatCommand>> sessions = new ConcurrentHashMap<>();

    @Autowired
    ActorSystem<SpawnProtocol.Command> system;

    public ChatSessions() {
    }

    private ActorRef<ChatCommand> createSession(UUID sessionId) {
        final Duration timeout = Duration.ofSeconds(10);

        CompletionStage<ActorRef<ChatCommand>> chatSessionReq =
                AskPattern.ask(
                        system,
                        replyTo -> new SpawnProtocol.Spawn<>(ChatSessionActor.create(), "chatSessionActor", Props.empty(), replyTo),
                        timeout,
                        system.scheduler());
        //chatSessionReq.whenComplete((actorRef, exc) -> {
        //    System.out.println("Created chat session actor " + sessionId);
        //    sessions.put(sessionId, actorRef);
        //});
        System.out.println("Waiting for completion " + sessionId);

        var actorRef = chatSessionReq.toCompletableFuture().join();
        sessions.put(sessionId, actorRef);

        System.out.println("After creation " + sessionId);
        sessions.get(sessionId);
        return actorRef;
    }

    public ActorRef<ChatCommand> getSession(UUID sessionId) {
        var chatSession = sessions.get(sessionId);
        if (chatSession == null) {
            System.out.println("Session doesn't exist, creating " + sessionId);
            var session = createSession(sessionId);
            if (session == null) {
                throw new RuntimeException("Failed to create chat session actor");
            }
            return session;
        } else {
            System.out.println("Returning exitsing session " + sessionId);
            return chatSession;
        }

    }
}
