package com.project.youtube.dao;

import com.project.youtube.model.User;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface UserDao<T extends User> {
    /*Basic crud*/
    T create(T data);
    Collection<T> list(int page, int pagesize);
    T get(Long id);
    T update(T data);
    Boolean delete(Long id);

    /*extra ops*/
}