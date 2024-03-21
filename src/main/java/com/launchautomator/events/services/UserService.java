package com.launchautomator.events.services;

import com.launchautomator.events.data.DataService;
import com.launchautomator.events.data.User;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final DataService dataService;

    public UserService(DataService dataService) {
        this.dataService = dataService;
    }

    public Optional<User> get(Long id) {
        return Optional.ofNullable(dataService.dataRoot().userIdMap.get(id));
    }

    public User update(User entity) {
        return dataService.save(entity);
    }

    public Collection<User> list() {
        return dataService.dataRoot().userIdMap.values();
    }

    public int count() {
        return (int) dataService.dataRoot().userIdMap.size();
    }

}
