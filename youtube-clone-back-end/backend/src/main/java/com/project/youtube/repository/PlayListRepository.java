package com.project.youtube.repository;

import com.project.youtube.model.PlayList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlayListRepository extends MongoRepository<PlayList, String> {
}
