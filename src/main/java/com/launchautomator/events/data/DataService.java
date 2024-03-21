
package com.launchautomator.events.data;

/*-
 * #%L
 * EclipseStore BookStore Demo
 * %%
 * Copyright (C) 2023 MicroStream Software
 * %%
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 * #L%
 */

import org.eclipse.store.integrations.spring.boot.types.concurrent.Read;
import org.eclipse.store.integrations.spring.boot.types.concurrent.Write;
import org.eclipse.store.storage.embedded.types.EmbeddedStorageManager;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataService
{
	/*
	 * Multiple maps holding references to the books, for a faster lookup.
	 */
	private final EmbeddedStorageManager storageManager;


	public DataService(final EmbeddedStorageManager storageManager)
	{
		this.storageManager = storageManager;
	}

	public DataRoot dataRoot()
	{
		return (DataRoot)storageManager.root();
	}

	public void initStorageManager()
	{
		Object root = storageManager.root();

		System.out.println("....................root="+ root);
		if (root == null) {
			root = new DataRoot();
			storageManager.setRoot(root);
			storageManager.storeRoot();
		}
	}

	@Write
	public User save(User user) {
		dataRoot().userNameMap.put(user.getName(), user);
		storageManager.store(dataRoot().userNameMap);  // the new added tenant will be stored implicitly if not already stored. See: https://docs.eclipsestore.io/manual/storage/storing-data/lazy-eager-full.html
		return user;
	}

	public void saveAll() {
		storageManager.store(dataRoot().userNameMap);
		storageManager.store(dataRoot().userIdMap);
		storageManager.store(dataRoot().eventIdMap);
		storageManager.store(dataRoot().chatRoomIdMap);
	}

	public void store(Object item) {
		storageManager.store(item);
	}



	@Read
	public Optional<User> findByUsername(String username) {
		return Optional.ofNullable(dataRoot().userNameMap.get(username));
	}

	@Read
	public Optional<Event> findByEventName(String eventName) {
		return dataRoot().eventIdMap.values().stream().filter(e -> e.getName().equals(eventName)).findFirst();
	}
}
