package com.project.youtube.service;

import com.project.youtube.model.Tag;

import java.util.List;


public interface TagService {
    Tag get(Long id);
    List<Tag> getByName(String name);
    List<Tag> getByVideoId(Long videoId);
    List<Tag> createVideoTag(Long videoId, List<String> tagName);
    void deleteVideoTags(Long videoId);
    void deleteVideoTagByTagId(Long videoId, Long tagId);
}
