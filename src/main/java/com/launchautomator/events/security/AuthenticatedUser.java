package com.launchautomator.events.security;

import com.launchautomator.events.data.DataService;
import com.launchautomator.events.data.User;
import com.vaadin.flow.spring.security.AuthenticationContext;
import java.util.Optional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class AuthenticatedUser {

    private final DataService dataService;
    private final AuthenticationContext authenticationContext;

    public AuthenticatedUser(AuthenticationContext authenticationContext, DataService dataService) {
        this.dataService = dataService;
        this.authenticationContext = authenticationContext;
    }

    public Optional<User> get() {
        return authenticationContext.getAuthenticatedUser(UserDetails.class)
                .map(userDetails -> dataService.findByUsername(userDetails.getUsername()).get());
    }

    public void logout() {
        authenticationContext.logout();
    }

}
