package com.project.youtube.repository;

import com.project.youtube.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<String, User> {
}
