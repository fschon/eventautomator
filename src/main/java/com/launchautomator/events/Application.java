package com.launchautomator.events;

import akka.actor.typed.ActorSystem;
import akka.actor.typed.SpawnProtocol;
import com.launchautomator.events.actors.EventGuardianActor;
import com.launchautomator.events.data.DataService;
import com.launchautomator.events.data.Event;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.theme.Theme;
import org.eclipse.store.integrations.spring.boot.types.EclipseStoreSpringBoot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Import;

/**
 * The entry point of the Spring Boot application.
 *
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 *
 */
@SpringBootApplication
@Import(EclipseStoreSpringBoot.class)
@Theme(value = "app")
@Push
public class Application implements AppShellConfigurator {

    @Autowired
    private ApplicationContext applicationContext;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


    // See: https://vaadin.com/blog/vaadin-in-akka
    //      https://www.baeldung.com/akka-with-spring
    @Bean(name = "actorSystem")
    @DependsOn({"dataGenerator"})
    public ActorSystem<SpawnProtocol.Command> actorSystem() {
        final ActorSystem<SpawnProtocol.Command> eventGuardianActor = ActorSystem.create(EventGuardianActor.create(), "event-guardian-actor");
        return eventGuardianActor;
    }

    @Bean
    @DependsOn({"dataGenerator"})
    public Event eventProducer(DataService dataService) {
        return dataService.findByEventName("World Coaching Summit").get();
    }

    @Bean(name = "dataGenerator")
    public Boolean dataGenerator(DataService dataService) {
        DataGenerator.generateEclipseStore(dataService);
        return true;
    }
}
