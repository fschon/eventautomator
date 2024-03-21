package com.launchautomator.events.actors;

import akka.actor.typed.Behavior;
import akka.actor.typed.SpawnProtocol;
import akka.actor.typed.javadsl.AbstractBehavior;
import akka.actor.typed.javadsl.ActorContext;
import akka.actor.typed.javadsl.Behaviors;

public abstract class EventGuardianActor extends AbstractBehavior<SpawnProtocol.Command> {
    public EventGuardianActor(ActorContext<SpawnProtocol.Command> context) {
        super(context);
    }

    public static Behavior<SpawnProtocol.Command> create() {
        return Behaviors.setup(
                context -> {
                    // Start initial tasks
                    // context.spawn(...)

                    return SpawnProtocol.create();
                });
    }
}
