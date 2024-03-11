package com.project.youtube.dao;

import java.util.List;

public interface TagsDao<T> {
    T get(Long id);
    List<T> getByName(String name);
    List<T> getByVideoId(Long videoId);
    T create(String name);
    T createVideoTag(Long videoId, String tagName);
    void delete(Long id);
    void deleteVideoTags(Long videoId);
    void deleteVideoTagByTagId(Long videoId, Long tagId);
}
